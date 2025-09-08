## 1) var, let, এবং const এর মধ্যে পার্থক্য কী?

- **var** → function-scoped variable।  
- **let** এবং **const** → block-scoped variable।  
- **var** এর মান **পুনরায় ঘোষণা (redeclare)** এবং **পুনরায় নির্ধারণ (reassign)** করা যায়।  
- **let** এর মান পুনরায় নির্ধারণ করা যায়, কিন্তু পুনরায় ঘোষণা করা যায় না।  
- **const** এর মান না পুনরায় ঘোষণা করা যায়, না পুনরায় নির্ধারণ করা যায়।  

---

## 2) map(), forEach(), এবং filter() এর মধ্যে পার্থক্য কী?

- **map()** → প্রতিটি element কে রূপান্তর করে নতুন array রিটার্ন করে। মূল array পরিবর্তন হয় না।  
- **forEach()** → প্রতিটি element এর জন্য function চালায়, কিন্তু নতুন array তৈরি করে না।  
- **filter()** → শর্ত মিলে এমন element গুলো নিয়ে নতুন array তৈরি করে। মূল array অপরিবর্তিত থাকে।  

---

## 3) Arrow Function কী?

ES6 এ **arrow function** হলো anonymous function লেখার একটি সংক্ষিপ্ত উপায়।  
এটি traditional function expression এর তুলনায় ছোট syntax প্রদান করে।


## 4) Destructuring Assignment কীভাবে কাজ করে?

ES6 এ **destructuring** হলো object এবং array থেকে মান বের করে variable এ assign করার একটি সংক্ষিপ্ত উপায়।  


## 5) Template Literals কী?

ES6 এ **template literals** হলো এমন একটি string তৈরি করার পদ্ধতি যেখানে expression embed করা যায়।  
এটি **backtick (`` ` ``)** দিয়ে লেখা হয়।

### Template Literals vs String Concatenation

1. Template literals এ `${}` এর ভিতরে যেকোনো JS expression ব্যবহার করা যায়।  
2. Template literals multiline string তৈরি করতে পারে।  
3. String concatenation এ `+` ব্যবহার করতে হয়, কিন্তু template literals এ লাগে না।  
4. Template literals কোডকে আরও সহজপাঠ্য (readable) করে।  

