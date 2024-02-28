import json

def set_item(path, data, is_json=True, lines=False):
    """Saves data to json file"""
    
    with open(path, 'w') as file:
        if is_json:
            json.dump(data, file, indent=4)
        elif lines:
            file.writelines(data)
        else:
            file.write(data)

    print("File '" + path + "' saved.")
    

def get_item(path, list=True):
    """Loads data from json or txt file. If extension is other than 'json' converts to list if 'list' is not False"""
    contents = False

    extension = path[path.rfind('.')+1:]

    with open(path, 'r') as file:

        if extension == 'json':
            contents = json.load(file)
        
        elif not list:
            contents = file.read()
        
        else:
            contents = []
            for line in file:
                contents.append(line.rstrip())

    print("Data loaded from '" + path + "'.")

    return contents