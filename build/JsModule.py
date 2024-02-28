from my_storage import get_item

class JsModule:

    def __parse_name(self):

        dotIndex = self.file_name.find('.')
        return self.file_name[0:dotIndex]

    def __group_lines_to_sections(self):

        for line in self.file:
            
            if line[0:7] == 'import ':
                self.import_section.append(line)
            
            elif line[0:7] == 'export ':
                self.export_section.append(line)
            
            else:
                self.content_section.append(line)

    def __set_import_names(self):

        def parse_line(line):

            startIndex = line.rfind('/') + 1
            endIndex = line.rfind('.')

            return line[startIndex:endIndex]

        for line in self.import_section:

            name = parse_line(line)
            self.import_names.append(name)


    def __init__(self, dir, file_name):

        self.dir = dir
        self.file_name = file_name
        self.name = self.__parse_name()
        self.path = dir + file_name
        self.file = get_item(self.path)
        self.import_section = []
        self.content_section = []
        self.export_section = []
        self.import_names = []
        self.__group_lines_to_sections()
        self.__set_import_names()
        self.used_by = []
        self.order = 'z'
        self.numeric_order = False
        self.layer = False
        self.other_layers = []

    
    def get_dir(self):

        return self.dir
    
    def get_file_name(self):

        return self.file_name
    
    def get_name(self):

        return self.name
    
    def get_import_names(self):

        return self.import_names
    
    def get_content(self):

        return self.content_section
    
    def set_order(self, order):

        self.order = order

    def get_order(self):

        return self.order
    
    def set_numeric_order(self, order):

        self.numeric_order = order

    def get_numeric_order(self):

        return self.numeric_order
    
    def add_used_by(self, module_name):

        self.used_by.append(module_name)

    def get_used_by(self):

        return self.used_by
    
    def set_layer(self, layer):

        if self.layer and self.layer != layer:
            self.other_layers.append(self.layer)
    
        self.layer = layer

    def get_layer(self):

        return self.layer
    
    def get_other_layers(self):

        return self.other_layers

