from my_dir import get_dir_list
from my_dir import get_all_paths
from my_storage import set_item

def test_get_dir_list():

    dir_list = get_dir_list('../src/')
    print(dir_list)

def test_get_all_paths():

    all_paths = get_all_paths('../src/')
    set_item('./data/test/all_paths.json', all_paths)


test_get_dir_list()
# test_get_all_paths()