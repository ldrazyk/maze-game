import os

def get_dir_list(dir, print=False):
    """Gets list of files and folders in directory"""

    list = os.listdir(dir)

    if (print):
        print("\nFiles in dir '" + dir + "':")
        print(list)

    return list


def get_all_paths(dir):

    paths = {"folders": [], "files": []}

    def process_dir(dir):

        def get_local_paths(dir):
            """Gets dict with 2 lists 'folders' and 'files' containing pairs: ['dir', 'folder'/'file']"""

            local_folders = []
            local_files = []

            list = get_dir_list(dir)

            for item in list:

                path = [dir, item]

                if os.path.isfile(dir + item):
                # if '.' in item:
                    local_files.append(path)
                else:
                    local_folders.append(path)
                    process_dir(path[0] + path[1] + '/')

            return {
                "folders": local_folders,
                "files": local_files
            }
        
        def add_local_paths_to_paths(local_paths):

            paths['folders'] += local_paths['folders']
            paths['files'] += local_paths['files']

        add_local_paths_to_paths( get_local_paths(dir) )

    process_dir(dir)

    return paths
    