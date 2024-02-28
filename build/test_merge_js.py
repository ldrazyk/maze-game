from merge_js import merge_js

def test():

    dir = '../src/'
    merged_file = './data/index.js'
    app_root = 'index'

    layers_roots = {
        'index': 'App Layer',
        'Model': 'Model Layer',
        'View': 'View Layer',
        'Controller': 'Controller Layer',
    }
    all_paths_file = './data/all_paths.json'
    modules_info_file = './data/modules_info.json'
    

    merge_js(
        dir=dir, 
        merged_file=merged_file, 
        app_root=app_root, 
        layers_roots=layers_roots, 
        # all_paths_file=all_paths_file, 
        # modules_info_file=modules_info_file
    )

test()