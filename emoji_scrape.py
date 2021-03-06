""" scraping emojipedia and saving data into MongoDB kill me please """
import requests
import json
from pprint import pprint
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from pymongo import MongoClient
from bson import json_util
from selenium.webdriver.support.ui import Select
from time import sleep
from selenium.common.exceptions import NoSuchElementException

#TODO: database-updating: user associates a word with a emoji, we should add that word-emoji pair into our database automatically 
# and rank emoji relevance given word by the # of times users associate them 
# e.g. "haha" and the "tears of joy" emoji

# TODO:  give emojis popularity rankings = # of times they're used???
#https://stackoverflow.com/questions/7714216/add-new-field-to-every-document-in-a-mongodb-collection
#TODO: better word-matching / autocomplete (e.g. "smile" = "smiley", "happy"="happy face")

#TODO: set up delay when fetching elements in case page takes some time to load 

# TODO: natural language processing API to match post's words with db's keywords (e.g. "smile" vs "smiley", "smiling")

#TODO: some emoji characters are blank... either delete or somehow display
"""
helpful: 
- display emoji in console:
https://stackoverflow.com/questions/5419/python-unicode-and-the-windows-console/32176732#32176732
"""

""" set up MongoDB database """
# store data into mongoDB database
client = MongoClient('localhost', 27017) # 27017 is default host for mongoDB

# create database / go to existing database 
db = client.Emojo
collection = db["Emojipedia"]
    
""" set up Selenium driver """
delay = 100
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--headless")   
driver = webdriver.Chrome(executable_path = "chromedriver.exe", chrome_options=chrome_options) # this runs browser without window

# driver = webdriver.Chrome(executable_path = "chromedriver.exe")


""" scrape """

# Every emoji by codePoint: https://emojipedia.org/emoji/ 
driver.get("https://emojipedia.org/emoji/")
# iterate through each row in table
emoji_list = driver.find_element_by_class_name("emoji-list")
emoji_list_length = len(emoji_list.find_elements_by_xpath(".//tbody/tr"))
print("emoji list length: ", emoji_list_length)

for r in range(3170, emoji_list_length+1): ###TODO: update r
# for row in emoji_list.find_elements_by_xpath(".//tr"):
    print("row ", r)
    # Every emoji by codePoint: https://emojipedia.org/emoji/


    driver.get("https://emojipedia.org/emoji/")
    sleep(1) 
    # iterate through each row in table

    emoji_list = driver.find_element_by_class_name("emoji-list")

    row = emoji_list.find_element_by_xpath(".//tbody/tr[{}]".format(r))


    # split character, string 
    name = row.find_element_by_xpath(".//td[1]/a/span").get_attribute("innerHTML") # 😀 Grinning Face
    name = name.strip()[2:]
    name = name.split(":")[0] #disregard skin color for now

    # if emoji of same already in collection (yellow skin color), skip same emoji of other colors
    if collection.count_documents({"name": name}) > 0:
        print(name, " already included")
        continue

    codePoints = row.find_element_by_xpath(".//td[2]").get_attribute("innerHTML") #U+1F600 
    codePoints = [i.strip() for i in codePoints.split(",")] #convert string to list

    # click on link, get fields from table, create entry
    link = row.find_element_by_xpath(".//td[1]/a").get_attribute("href")
    driver.get(link)
    sleep(1) # so I don't crash the website :')  also for page to load
    
    emoji_detail = driver.find_element_by_class_name("emoji-detail")
    
    # name      = driver.find_element_by_xpath(".//html/body/div[2]/div[1]/article/h1").text
#    character = emoji_detail.find_element_by_xpath(".//tr[1]/td[2]/span").get_attribute("innerHTML")
    character   = emoji_detail.find_element_by_class_name("emoji").get_attribute("innerHTML")
    # shortcode   = emoji_detail.find_element_by_class_name("shortcodes").get_attribute("innerHTML")

    try: 
        tags_string = emoji_detail.find_element_by_class_name("tags").get_attribute("innerHTML")
        tags        = [i.strip() for i in tags_string.split(",")]
    except NoSuchElementException:
        tags = []

    # go to "show more..." to get aliases

    description_link = emoji_detail.find_element_by_xpath(".//tr[3]/td[2]/a").get_attribute("href")
        
    driver.get(description_link)
    sleep(1)

    # get aliases
    # if aliases exist, aliases = [Strings]. Else, aliases = []. 
    try:
        aliases_section = driver.find_element_by_class_name("aliases")
        aliases_li = aliases_section.find_elements_by_xpath(".//ul/li") # list of li objects
    except NoSuchElementException:
        aliases_li = []

    # get alias from each li element
    aliases = []

    if len(aliases_li) > 0:
        for alias in aliases_li:
            aliases.append(alias.text.strip()[2:])
    
   




    # would use set() but set is not a datatype accepted by mongo Schema
    keywords = [name] + tags + aliases

    # print("keywords: ", keywords)
    print("name: ", name)
    print("character: ", character)
    print("codePoint: ", codePoints)
    # print("shortcode: ", shortcode)
    print("tags: ", tags)
    print("aliases: ", aliases)
    
    
    # Create mongoDB entry
    # for search, if post.word in keywords, show emoji

    """
    {{keywords=tags, alias, name}: {
            "character"`: Emoji 
            "codePoints": U+1F603,  
            "shortcode" : ":grinning:", 
            }
    }
    """

    emoji_entry = { 
                   "keywords"   : keywords,     # array
                   "character"  : character,    # unicode?
                   "codePoints" : codePoints,   # string
                #    "shortCode"  : shortcode,    # string
                   "name"       : name,         # string
                   "tags"       : tags,         # array
                   "aliases"    : aliases       # array
    }

    # insert into  mongoDB if not already exist (assume emoji have unique names)
    collection.update_one({"name": name},{"$set": emoji_entry}, upsert=True)

# def get_value(element):
#    '''
#    given HTML element, returns HTML element
#    '''    
#    try: 
#        elt = WebDriverWait(driver, delay).until(EC.presence_of_element_located((By.XPATH, xpath)))
#        value = elt.get_attribute('innerHTML')
#    except TimeoutException:
#        # if element fails to load, program is halted
#        raise TimeoutException("timed out. webpage did not respond in {}".format(delay))
       
#    return value


