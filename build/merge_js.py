import string
import time
from JsModule import JsModule
from my_storage import set_item
from my_storage import get_item
from my_dir import get_all_paths

def merge_js(dir, merged_file, app_root, layers_roots=False, all_paths_file=False, modules_info_file=False):
    """ Merges all js modules in 'dir' that are imported to 'app_root' module or its children, and saves to 'merged_file'.
        Modules must use ES6 import/export syntax. Use modules names without extension.
        Optional: 
        * 'layers_roots' - adds comments at the top of the layer (={root_module: layer_name, ...})
        * 'all_paths_file', 'modules_info_file' - paths to save modules informations"""

    def get_file_paths():

        all_paths = get_all_paths(dir)

        if all_paths_file:
            set_item(all_paths_file, all_paths)

        return all_paths['files']
    

    def create_modules(paths):

        modules = {}

        for path in paths:

            module = JsModule(path[0], path[1])
            name = module.get_name()
            
            if name not in modules.keys():
                modules[name] = module

            else:
                print('Error: more than 1 module with name: ' + name)
        
        return modules


    def set_modules_position_in_app( modules ):

        alphabet = list(string.ascii_lowercase)
        
        def process_import_modules(parent_module):

            parent_name = parent_module.get_name()
            parent_order = parent_module.get_order()
            import_names = parent_module.get_import_names()
            n = 0

            for name in import_names:

                module = modules[name]
                module.set_order(parent_order + alphabet[n])
                module.add_used_by(parent_name)
                
                if (layers_roots):
                    module_name = module.get_name()
                    if (module_name in layers_roots):
                        module.set_layer(layers_roots[module_name])
                    else:
                        module.set_layer(parent_module.get_layer())
                    
                n += 1
                process_import_modules(module)

        def process_app_root():

            root_module = modules[app_root]
            root_module.set_order('a')
            root_module.set_layer(layers_roots[app_root])
            process_import_modules(root_module)

        process_app_root()


    def get_sorted_list(modules):

        def get_order(module):
            return module.get_order()

        modules_list = list(modules.values())
        modules_list.sort(key=get_order, reverse=True)

        set_numeric_order_in_modules(modules_list)
        if modules_info_file:
            create_modules_info(modules_list)

        return modules_list
    

    def set_numeric_order_in_modules(modules_list):

        n = 1
        for module in reversed(modules_list):

            module.set_numeric_order(n)
            n += 1


    def create_modules_info(modules_list):

        def create_module_info(module):

            module_info = {}

            module_info['name'] = module.get_name()
            module_info['dir'] = module.get_dir()
            module_info['file_name'] = module.get_file_name()
            module_info['import_modules'] = module.get_import_names()
            module_info['order'] = module.get_order()
            module_info['numeric_order'] = module.get_numeric_order()
            module_info['used_by'] = module.get_used_by()
            module_info['layer'] = module.get_layer()
            other_layers =module.get_other_layers()
            if len(other_layers) > 0:
                module_info['other_layers'] = other_layers

            return module_info


        info = []

        for module in modules_list:

            module_info = create_module_info(module)    
            info.append(module_info)

        set_item(modules_info_file, info)


    def merge_modules(modules_list):

        merged = []
        layers_titles = []

        def add(lines):
            merged.extend(lines)

        def add_time():

            add(['// ' + time.ctime()])

        def add_layers_title(module):

            layer = module.get_layer()
            if layer not in layers_titles:
                add(['', '// ' + layer.upper(), ''])
                layers_titles.append(layer)

        def add_content(module):

            add(module.get_content())

        def merge():

            add_time()

            for module in modules_list:
                
                order = module.get_order()
                if (order != 'z'):
                
                    add_layers_title(module)
                    add_content(module)

        merge()

        return merged
    

    def write_to_file(lines):

        set_item(merged_file, '\n'.join(lines), False)


    def exec():

        modules = create_modules(get_file_paths())
        set_modules_position_in_app(modules)
        modules_sorted = get_sorted_list(modules)
        write_to_file(merge_modules(modules_sorted))

    exec()