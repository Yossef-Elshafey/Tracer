import subprocess


class Caller:

    def __init__(self):
        self.read_curl()
        self.line_num = int(input("Command num: "))
        self.excute()

    @staticmethod
    def prompt():
        return int(input("call num: "))

    @staticmethod
    def reader():
        with open("curl.txt", "r") as f:
            return f.readlines()

    def read_curl(self):
        for i, line in enumerate(self.reader()):
            if line.startswith("#"):
                print(line.replace("#", "").strip().upper())
            else:
                print(i, ">>")
                print(line)

    def excute(self):
        command = self.reader()[self.line_num]
        subprocess.run(command, shell=True)


Caller()
