#script written by shahules
try:
	from urllib import urlopen	
	from bs4 import BeautifulSoup
	import re
	from pymongo import MongoClient
	import itertools
	import datetime
except ImportError:
	print("Import error has occured")

#global varialbles
linked=[]
titled=[]

def gettopic(bsobj):
	topic=bsobj.find("title")
	return(topic.get_text()[15:])

#getting titles
def getlinks(bsobj):
	links = bsobj.findAll("link",{"href":re.compile(r'^(https://www.google.com/url).*')})
	for link in links:	
			linked.append( link.attrs["href"])
	

	
	
	

#getting links
def gettitles(bsobj):
	titles=bsobj.findAll("title",{"type":"html"})
	for title in titles:
		title=title.get_text()	
		title=re.sub(r'<(/)?b>'," ",title)
		titled.append(title)	


#writing into databse			
def database(titled,linked,topic):
		client=MongoClient()
		db=client.alertdb
		for title,link in itertools.izip(titled,linked):
			result=db.alertdb.insert_one({"topic":topic,"title":title,"link":link,"Date":datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")})
			print(result.inserted_id)

#main

try:
	url = ""
	html = urlopen(url)
	
	
	bsobj=BeautifulSoup(html.read(),"html.parser")
	topic=gettopic(bsobj)
	getlinks(bsobj)

	gettitles(bsobj)
	database(titled,linked,topic)
	
except Exception as e:
	print(e)
