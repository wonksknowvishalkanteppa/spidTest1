import speedtest


# source="192.168.1.85"
# s=speedtest.Speedtest(source_address=source)
# print(s._source_address)
# # s.get_best_server()
# print(s.upload())

source = "10.41.141.207"
speedtest.SOURCE = source
# socket.socket = speedtest.bound_socket
s = speedtest.Speedtest()
s.get_best_server()
print(s.download()/1024/1024)
print(s.upload()/1024/1024)