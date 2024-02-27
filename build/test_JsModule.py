from JsModule import JsModule

def test():

    module = JsModule('../src/', 'App.mjs')

    print(module.import_names)

test()