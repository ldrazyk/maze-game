import string
from JsModule import JsModule
from my_storage import set_item
from my_dir import get_all_paths

def concat_src():

    def get_paths():

        dir_src = '../src/'
        paths_src_file = './data/paths_src.json'

        # all_paths = get_and_store_all_paths(dir_src, paths_src_file)
        all_paths = get_all_paths(dir_src)

        return all_paths
    

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


    def set_modules_position_in_app( modules, app_root, layers_roots=False ):

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

        root_module = modules[app_root]
        root_module.set_order('a')
        root_module.set_layer('App layer')
        process_import_modules(root_module)


    def create_modules_info(modules_list):

        info = []

        for module in modules_list:

            module_info = {}

            module_info['name'] = module.get_name()
            module_info['dir'] = module.get_dir()
            module_info['file_name'] = module.get_file_name()
            module_info['import_modules'] = module.get_import_names()
            module_info['order'] = module.get_order()
            module_info['used_by'] = module.get_used_by()
            module_info['layer'] = module.get_layer()
            other_layers =module.get_other_layers()
            if len(other_layers) > 0:
                module_info['other_layers'] = other_layers
                
            info.append(module_info)

        modules_info_file = './data/modules_info.json'
        set_item(modules_info_file, info)

    def get_sorted_list(modules):

        def get_order(module):
            return module.get_order()

        modules_list = list(modules.values())
        modules_list.sort(key=get_order, reverse=True)

        return modules_list
    
    def merge_modules(modules_list):

        merged = []

        def add(lines):
            merged.extend(lines)

        layers_titles = []

        def add_layers_title(module):

            layer = module.get_layer()
            if layer not in layers_titles:
                add(['', '// ' + layer, ''])
                layers_titles.append(layer)

        def add_content(module):

            add(module.get_content())


        for module in modules_list:
            
            order = module.get_order()
            if (order != 'z'):
            
                add_layers_title(module)
                add_content(module)

        return merged

    def write_to_file(path, lines):

        set_item(path, '\n'.join(lines), False)


    all_paths = get_paths()
    modules = create_modules(all_paths['files'])
    app_root = 'index'
    layers_roots = {
        'index': 'APP LAYER',
        'Model': 'MODEL LAYER',
        'View': 'VIEW LAYER',
        'Controller': 'CONTROLLER LAYER',
    }
    set_modules_position_in_app(modules, app_root, layers_roots)
    modules_sorted = get_sorted_list(modules)
    # create_modules_info(modules_sorted)
    merged = merge_modules(modules_sorted)
    write_to_file('./data/index.js', merged)

    



concat_src()