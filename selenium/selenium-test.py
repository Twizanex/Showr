import selenium
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait 
import time
URL = "http://localhost:3000"
driver = webdriver.Firefox()
driver.get(URL)

def testRegistration():
	driver.get(URL+"/signup")
	username = driver.find_element_by_name("username")
	password = driver.find_element_by_name("password")
	form = driver.find_element_by_class_name("form-signin")
	username.send_keys("newuser1")
	password.send_keys("newuser1")
	form.submit()	
	if(driver.current_url != URL+"/profile"):	
		return False

	driver.get(URL+"/signup")
	username = driver.find_element_by_name("username")
	password = driver.find_element_by_name("password")
	form = driver.find_element_by_class_name("form-signin")
	username.send_keys("newuser1")
	password.send_keys("newuser1")
	form.submit()
	if(driver.current_url != URL+"/signup"):
		return False

	return True
def testLogin():
	driver.get(URL+"/signin")
	username = driver.find_element_by_name("username")
	password = driver.find_element_by_name("password")
	form = driver.find_element_by_class_name("form-signin-heading")
	username.send_keys("notexistinguser")
	password.send_keys("notexistinguser")
	form.submit()
	if(driver.current_url != URL+"/signin"):
		return False	

	driver.get(URL+"/signin")
	username = driver.find_element_by_name("username")
	password = driver.find_element_by_name("password")
	form = driver.find_element_by_class_name("form-signin")
	username.send_keys("newuser1")
	password.send_keys("newuser1")
	form.submit()	
	if(driver.current_url != URL+"/profile"):
		return False	
	return True

def testPosting():
	driver.get(URL+"/profile")
	posts_before = driver.find_elements_by_class_name("media")
	input = driver.find_element_by_id("postMessage")
	form = driver.find_element_by_id("messageForm")
	input.send_keys("selenium")	
	form.submit()
	input.clear()
	posts_after = driver.find_elements_by_class_name("media")
	if( len(posts_before) == len(posts_after) ):	
		return False

	posts_before = driver.find_elements_by_class_name("media")
	input.send_keys("")
	form.submit()
	input.send_keys("x"*141)
	form.submit()
	input.clear()
	posts_after = driver.find_elements_by_class_name("media")
	if( len(posts_before) != len(posts_after) ):
		return False
	return True

def registerFriend():
	driver.get(URL+"/signup")
	username = driver.find_element_by_name("username")
	password = driver.find_element_by_name("password")
	form = driver.find_element_by_class_name("form-signin")
	username.send_keys("friend1")
	password.send_keys("friend1")
	form.submit()


def testFriendlist():	
	driver.get(URL+"/profile")	
	friends_before = driver.find_elements_by_id("friendItems")
	driver.get(URL+"/users/friend1")
	button = driver.find_element_by_class_name("addfriendButton")
	button.click()
	driver.get(URL+"/profile")
	friends_after = driver.find_elements_by_id("friendItems")
	if( len(friends_before) == len(friends_after)):
		return False

	friends_before = driver.find_elements_by_id("friendItems")
	driver.get(URL+"/users/friend1")
	button = driver.find_element_by_class_name("removefriendButton")
	button.click()
	driver.get(URL+"/profile")
	friends_after = driver.find_elements_by_id("friendItems")
	if( len(friends_before) == len(friends_after)):
		return False
	return True

def testSearch():
	driver.get(URL+"/")
	form = driver.find_element_by_id("usersearch")
	input = driver.find_element_by_name("user")	
	input.send_keys("friend1")
	form.submit()
	if(driver.current_url != URL+"/users/friend1"):
		print(driver.current_url)
		return False

	form = driver.find_element_by_id("usersearch")
	input = driver.find_element_by_name("user")	
	input.send_keys("notexistinguser")
	form.submit()
	if(driver.current_url != URL+"/usersearch"):
		return False

	return True

def testLogout():
	driver.get(URL+"/signout")
	if(driver.current_url != URL+"/"):
		print(driver.current_url)
		return False

	return True

def testChat():
	driver.get(URL+"/profile")
	input = driver.find_element_by_id("message")
	button = driver.find_element_by_id("send")
	input.send_keys("asd")
	posts_before_submit = driver.find_elements_by_id("message-post")
	button.click()
	posts_after_submit = driver.find_elements_by_id("message-post")
	print(len(posts_before_submit))	
	print(len(posts_after_submit))
	if(len(posts_before_submit) >= len(posts_after_submit)):
		return False

	return True

if( testRegistration() ):
	print("Registration - OK")
	registerFriend()
else:
	print("Registration - Failed")

if( testLogin() ):
	print("Login - OK")
else:
	print("Login - Failed")

if( testPosting() ):
	print("Posting - OK")
else:
	print("Posting - Failed")

if( testFriendlist() ):
	print("Friendlist - OK")
else:
	print("Friendlist - Failed")

if( testSearch() ):
	print("Usersearch - OK")
else:
	print("Usersearch - Failed")

if( testLogout() ):
	print("Logout - OK")
else:
	print("Logout - Failed")

if( testChat() ):
	print("Chat - OK")
else:
	print("Chat - Failed")

driver.quit()