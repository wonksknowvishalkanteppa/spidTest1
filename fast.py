import speedtest

source="192.168.1.85"
s=speedtest.Speedtest(source_address=source)
s.get_best_server()
print(s.upload())