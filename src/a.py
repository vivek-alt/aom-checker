import json
dataf={}
with open('transport.json') as file:
    data=json.load(file)
    with open('craftable.json') as refe:
        dataref=json.load(refe)
        for i in data:
            dataf[i]=[]
            for j in data[i]:
                dataf[i].append(j)
                if j["tier"]=="6":
                    t7name="T7"+j["uniquename"][2:]
                    t8name="T8"+j["uniquename"][2:]
                    item=[x for x in dataref if x["uniquename"]==t7name or x["uniquename"]==t8name]
                    dataf[i].append(item[0])
                    dataf[i].append(item[1])
        for i in dataf:
            print(len(dataf[i]))
out_file = open("transport1.json", "w")
json.dump(dataf,out_file)
out_file.close()