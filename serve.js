var express = require("express");
var app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const DIR = 'src/uploads';

app.use(express.static(__dirname+'/dist/e-commerce-proj'));
app.get('/*',function(req,res){
	res.sendFile(path.join(__dirname+'/dist/e-commerce-proj/index.html'));
});

var picname;

let storage = multer.diskStorage({
 destination: (req, file, cb) => {
 cb(null, DIR);
 },
 filename: (req, file, cb) => 
	{
		picname=Date.now() + file.originalname;
		cb(null, picname);
 }
});
let upload = multer({storage: storage});


//for cors
app.use(function (req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', 'https://ecommerce-webpage-try.herokuapp.com/');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 res.setHeader('Access-Control-Allow-Credentials', true);
 next();
});

var mongoose = require("mongoose");

var SignupSchema = new mongoose.Schema( {name:String,username: {type:String,unique:true}, pass: String, usertype:String}, { versionKey: false } );

var Signup = mongoose.model("signup", SignupSchema,"signup");

var CategorySchema = new mongoose.Schema( {catname:String,catpic:String}, { versionKey: false } );
var managecat = mongoose.model("managecat", CategorySchema,"managecat");

var SubCategorySchema = new mongoose.Schema( {catid:String,subcatname:String,spic:String}, { versionKey: false } );
var managesubcat = mongoose.model("managesubcat", SubCategorySchema,"managesubcat");

var ProductSchema = new mongoose.Schema( {catid:String,subcatid:String,pname:String,prate:Number,pdesc:String,pdiscount:Number,pstock:Number,spic:String}, { versionKey: false } );
var manageproduct = mongoose.model("manageproduct", ProductSchema,"manageproduct");

var CartSchema = new mongoose.Schema( {prodid:String,pname:String,prate:Number,qt:Number,tc:Number,ppic:String, username:String}, { versionKey: false } );
var cart = mongoose.model("cart", CartSchema,"cart");

var CheckoutSchema=new mongoose.Schema( {orderamount:String,address:String,username:String,orderdate:String,paymentmode:String,status:String,cardno:String,holdername:String,expdate:String,cvvno:String}, {versionKey:false} );
var checkout=mongoose.model("checkout",CheckoutSchema,"checkout");

var orderSchema = new mongoose.Schema( {orderid:String,pid:String,pname:String,prate:Number,qty:Number,tc:Number,ppic:String,username:String }, { versionKey: false } );
var order = mongoose.model("order", orderSchema,"order");

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded( { extended: true } ));
app.use(bodyparser.json());

app.post("/api/mymsg",function(req,res)
{
    console.log(req.body.un);
    console.log(req.body.passw);
    res.send("HELLO ANGULAR,WELCOME TO NODEJS");
})

app.post("/api/signup", function(req, res) {
 mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});

 
 var newsignup = new Signup( {name:req.body.nm,username: req.body.uname, pass: req.body.pass,usertype:"common"} );
 
 newsignup.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Error while signing up, try again (try using different username)");
 //mongoose.connection.close();
 }
 else
 {
 res.send("Signup Successfull");
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});
app.post("/api/adminsignup", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
   
	
	var newsignup = new Signup( {name:req.body.nm,username: req.body.uname, pass: req.body.pass,usertype:"admin"} );
	
	newsignup.save(function(err) {
	if (err)
	{
	console.log(err);
	res.send("Error while signing up, try again");
	//mongoose.connection.close();
	}
	else
	{
	res.send("Signup Successfull");
	//mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });
   
app.post("/api/login", function(req, res) {
 mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
 console.log(req.body);

 Signup.find({ username:req.body.un,pass:req.body.passw}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send(err);
 //mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send(data);
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});

app.put("/api/updatestatus", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	//var d = new Date();
	checkout.update({ _id: req.body.oid }, { $set: { status: req.body.newstatus}},function(err) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
	//mongoose.connection.close();
	}
	else
	{
	res.send("Successfully Updated");
	//mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });




app.put("/updatecat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 //var d = new Date();
 managecat.update({ _id: req.body.catid }, { $set: { catname: req.body.catname}},function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
 }
 else
 {
 res.send("Successfully Updated");
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});



app.delete("/deletecat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 console.log(req.query);

 managecat.remove({ _id: req.query.catid }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 //mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});
app.post("/api/addcat",upload.single('photo'), function(req, res) 
{
 mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
 //var d = new Date(); 
 if (!req.file) 
 {
 picname="noImageFound.jfif";
 };
 
 var newmanagesubcat = new managecat( {catname:req.body.catname,catpic:picname} );
 newmanagesubcat.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 //mongoose.connection.close();
 }
 else
 {
 res.send("Successfully Inserted");
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});



app.post("/api/managesubcat",upload.single('photo'), function(req, res) 
{
 mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
 //var d = new Date(); 
 if (!req.file) 
 {
 picname="noImageFound.jfif";
 };
 
 var newmanagesubcat = new managesubcat( {catid:req.body.catid, subcatname:req.body.scatname,spic:picname} );
 newmanagesubcat.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 //mongoose.connection.close();
 }
 else
 {
 res.send("Successfully Inserted");
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});

app.get("/api/fetchsubcat",function(req,res){
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	managesubcat.find({catid:req.query.cid},function(err,data)
	{
		if(err)
		{
			console.log(err);
			res.send("FAILED");
			//mongoose.connection.close();
		}
		else
		{
			console.log(data);
			res.send(data);
			//mongoose.connection.close();
		}
		mongoose.connection.close();
	});
});
//for delete sub- category using managecat component
app.delete("/deletesubcat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 console.log(req.query);

 managesubcat.remove({ _id: req.query.subcatid }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 //mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});
//update sub-categories
app.put("/updatesubcat", upload.single('photo'),function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 //var d = new Date();
 
 
 if (!req.file) 
 {
 picname=req.body.oldpic;
 }
 else
 {
	 if(req.body.oldpic!="noPhotoFound.png")
	 {
		 fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
		 if (err) throw err;
		 console.log('file was deleted');
		 });
	 }
 }
 managesubcat.update({ _id: req.body.subcatid }, { $set: {catid:req.body.catid, subcatname: req.body.subcatname, spic:picname}},function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 //mongoose.connection.close();
 }
 else
 {
 res.send("Successfully Updated");
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});

app.delete("/api/delprod", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	console.log(req.query);
    if(req.query.spic!="noImageFound.jfif")
	 {
		 fs.unlink('src/uploads/' + req.query.spic, (err) => {
		 if (err) throw err;
		 console.log('file was deleted');
		 });
	 }
	manageproduct.remove({ _id: req.query.pid }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send("Failed");
	//mongoose.connection.close();
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	//mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });


   app.delete("/api/delcat", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	console.log(req.query);
    if(req.query.catpic!="noImageFound.jfif")
	 {
		 fs.unlink('src/uploads/' + req.query.catpic, (err) => {
		 if (err) throw err;
		 console.log('file was deleted');
		 });
	 }
	managecat.remove({ _id: req.query.cid }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send("Failed");
	//mongoose.connection.close();
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	//mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });

   app.delete("/api/delsubcat", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	console.log(req.query);
    if(req.query.subcatpic!="noImageFound.jfif")
	 {
		 fs.unlink('src/uploads/' + req.query.subcatpic, (err) => {
		 if (err) throw err;
		 console.log('file was deleted');
		 });
	 }
	managesubcat.remove({ _id: req.query.subid }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send("Failed");
	//mongoose.connection.close();
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	//mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });


app.delete("/api/removecartitems", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	cart.remove({ _id: req.query.cid }, function(err, data)
	{
	if (err)
	{
	console.log(err);
	res.send("Failed");
	//mongoose.connection.close();
	}
	else
	{
	console.log(data);
	res.send("Successfully Deleted");
	//mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });

app.post("/api/manageprod" ,upload.single('photo'), function(req, res) {
 mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
 //var d = new Date();
 
 if (!req.file) 
 {
 picname="noImageFound.jfif";
 };
 
 var newmanageproduct = new manageproduct( { catid:req.body.catid,subcatid:req.body.subcatid,pname:req.body.prodname,prate:req.body.prate,pdesc:req.body.pdesc,pdiscount:req.body.pdiscount,pstock:req.body.pstock,spic:picname} );
 newmanageproduct.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
 }
 else
 {
 res.send("Product added successfully");
// mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});

app.put("/api/updateprod", upload.single('photo'),function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	//var d = new Date();
	
	
	if (!req.file) 
	{
	picname=req.body.oldpic;
	}
	else
	{
		if(req.body.oldpic!="noImageFound.jfif")
		{
			fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
			if (err) throw err;
			console.log('file was deleted');
			});
		}
	}
	manageproduct.update({ _id: req.body.pid }, { $set: {catid:req.body.catid, subcatid: req.body.subcatid,pname:req.body.prodname ,prate:req.body.prate ,pdesc:req.body.pdesc ,pdiscount:req.body.pdiscount ,pstock:req.body.pstock ,spic:picname}},function(err) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
	//mongoose.connection.close();
	}
	else
	{
	res.send("Successfully Updated");
	//mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });


   app.put("/api/updatecat", upload.single('photo'),function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	//var d = new Date();
	
	
	if (!req.file) 
	{
	picname=req.body.oldpic;
	}
	else
	{
		if(req.body.oldpic!="noImageFound.jfif")
		{
			fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
			if (err) throw err;
			console.log('file was deleted');
			});
		}
	}
	managecat.update({ _id: req.body.cid }, { $set: {catname:req.body.cname ,catpic:picname}},function(err) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
	//mongoose.connection.close();
	}
	else
	{
	res.send("Successfully Updated");
	//mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });

   app.put("/api/updatesubcat", upload.single('photo'),function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	//var d = new Date();
	
	
	if (!req.file) 
	{
	picname=req.body.oldpic;
	}
	else
	{
		if(req.body.oldpic!="noImageFound.jfif")
		{
			fs.unlink('src/uploads/' + req.body.oldpic, (err) => {
			if (err) throw err;
			console.log('file was deleted');
			});
		}
	}
	managesubcat.update({ _id: req.body.subid }, { $set: {subcatname:req.body.scatname ,catpic:picname,catid:req.body.catid}},function(err) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
	//mongoose.connection.close();
	}
	else
	{
	res.send("Successfully Updated");
	//mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });


app.post("/api/addcart" ,function(req, res) {
 mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
 //var d = new Date();
 
 var newcart = new cart( {prodid:req.body.pid,pname:req.body.pname,prate:req.body.prate,qt:req.body.qt,tc:req.body.tc,ppic:req.body.ppic, username:req.body.username } );
 newcart.save(function(err) {
 if (err)
 {
 console.log(err);
 res.send("Error while adding to cart, try again");
 //mongoose.connection.close();
 }
 else
 {
 res.send("Product added to cart successfully");
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});

app.put("/api/updatecart", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	//var d = new Date();
		cart.update({_id:req.body._id }, {$set: { qt:req.body.qt,tc:req.body.tc}},function(err){
		if (err)
		{
		 console.log(err);
		 res.send("Failed");
	//	 mongoose.connection.close();
		}
		else
		{
		 console.log("cart updated");
		 //res.send("Successfully Deleted");
	//	 mongoose.connection.close();
		}
		mongoose.connection.close();
	});
});


//get cart products from showcart component
app.get("/api/getcart", function(req, res) {
 mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
 console.log(req.query);

 cart.find({ username:req.query.un}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 //mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send(data);
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});


//delete cart products from show cart products
app.delete("/deletecardprod", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 console.log(req.query);

 cart.remove({ _id: req.query.pid }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 //mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});

//get order number for ordersuccess component
app.get("/api/getordernum", function(req, res) {
 mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
 checkout.find({ username: req.query.un }, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send(data);
// mongoose.connection.close();
 }
 mongoose.connection.close();
 }).sort({"odate":-1});
});

//get cart details is as same as get cart prod api
app.get("/api/getcartprods", function(req, res) {
 mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
 cart.find({ username: req.query.un }, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 //mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send(data);
 //mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});
app.get("/api/checkcartprods", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	cart.find({ username: req.query.un ,prodid:req.query.prodid }, function(err, data) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
//	mongoose.connection.close();
	}
	else
	{
	console.log(data);
	res.send(data);
//	mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });


//insert order details for ordersuccess component
app.post("/api/insertorder",function(req,res)
{
mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
var neworder=req.body;

order.insertMany(neworder, function (err, docs) {
 if (err){ 
 return console.error(err);
 //mongoose.connection.close();
 } else {
 console.log("Multiple documents inserted to Collection");
res.send("Successfully inserted");
//mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});

app.post("/api/checkout", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	  var d = new Date();
	  
	var newcheckout = new checkout( {orderamount:req.body.billtot,address:req.body.add,username:req.body.un,orderdate:d,paymentmode:req.body.pmode,status:"Payment received, processing",cardno:req.body.cardno,coname:req.body.coname,holdername:req.body.hname,expdate:req.body.expdt,cvvno:req.body.cvv} );
	
	newcheckout.save(function(err) {
	  if (err)
	  {
		console.log(err);
		res.send("Error while signing up, try again");
	//	mongoose.connection.close();
	  }
	  else
	  {
		  console.log("ok");
		res.send("ok");
	//	mongoose.connection.close();
	  }
	  mongoose.connection.close();
	});
  });

//update stock after the successful of order
app.put("/api/updatestock",function(req,res){
mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
var updatelist=req.body;
console.log("products used="+updatelist);
for(let x=0;x<updatelist.length;x++)
{
	console.log(x);
manageproduct.updateOne({_id:updatelist[x].pid},{$inc: {"pstock":-updatelist[x].qty}},function(err,data){
if (err)
{
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
}
else
{
 console.log("successful updation of stock"+data);
 //res.send("Successfully Deleted");
// mongoose.connection.close();
}

});
}
mongoose.connection.close();
});



//empty the cart after order complition
app.delete("/api/emptycart", function(req, res) {
 mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
 cart.remove({ username:req.query.un }, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send("removed to cart successfully");
// mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});
app.get("/getproductdetailbypid", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 manageproduct.find({ _id: req.query.pid }, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send(data);
// mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});

//get subcat by related catid manage product component
app.get("/getsubcat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 console.log(req.query);

 managesubcat.find({ catid: req.query.catid}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
 //mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send(data);
// mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});


app.get("/getprodsbysubcat", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 console.log(req.query);

 manageproduct.find({ subcatid: req.query.sid}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send(data);
// mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});

app.get("/getprodsbyquery", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 console.log(req.query);

 manageproduct.find({ "pname": {$regex:'.*' + req.query.q + '.*'}}, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send(data);
// mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});


app.delete("/deleteuser", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 console.log(req.query);

 Signup.remove({ _id: req.query.un }, function(err, data)
 {
 if (err)
 {
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send("Successfully Deleted");
// mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});

app.get("/fetchuserbyun", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 console.log(req.query.uname);
 Signup.find({ username: req.query.uname}, function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
 }
 else
 {
 res.send(data);
// mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});


app.get("/api/fetchorders", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	console.log(req.query.uname);
	checkout.find({ username: req.query.uname}, function(err, data) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
//	mongoose.connection.close();
	}
	else
	{
	res.send(data);
//	mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });


   app.get("/api/fetchallorders", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	checkout.find(function(err, data) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
//	mongoose.connection.close();
	}
	else
	{
	res.send(data);
//	mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });

app.get("/fetchusers", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 Signup.find(function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send(data);
// mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});
app.get("/api/fetchprod", function(req, res) {
	mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
	Signup.find({_id:req.query.pid},function(err, data) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
//	mongoose.connection.close();
	}
	else
	{
	console.log(data);
	res.send(data);
//	mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });

   app.get("/api/fetchprodbyname", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	manageproduct.find({pname: { $regex: '.*' + req.query.pname ,$options:'i' }} ,function(err, data) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
//	mongoose.connection.close();
	}
	else
	{
	console.log(data);
	res.send(data);
//	mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });

app.get("/api/fetchcat", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	managecat.find(function(err, data) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
//	mongoose.connection.close();
	}
	else
	{
	console.log(data);
	res.send(data);
//	mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });
app.get("/api/fetchproducts", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	manageproduct.find(function(err, data) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
//	mongoose.connection.close();
	}
	else
	{
	console.log(data);
	res.send(data);
//	mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });

app.get("/getallcategories", function(req, res) {
 mongoose.connect("mongodb://localhost/projdb",{useNewUrlParser: true});
 managecat.find(function(err, data) {
 if (err)
 {
 console.log(err);
 res.send("Failed");
// mongoose.connection.close();
 }
 else
 {
 console.log(data);
 res.send(data);
// mongoose.connection.close();
 }
 mongoose.connection.close();
 });
});

app.get("/api/listmembers",function(req,res){
mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
Signup.find({"usertype":"common"},function(err,data){
if(err)
{
	console.log(err);
	res.send(err);
//	mongoose.connection.close();
}
else
{
	console.log(data);
	res.send(data);
//	mongoose.connection.close();
}
mongoose.connection.close();
})
})

app.delete("/api/deluser",function(req,res){
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	console.log(req.query);
	Signup.remove({_id:req.query.id},function(err,data)
	{
		if(err)
		{
			console.log(err);
			res.send("Failed");
	//		mongoose.connection.close();
		}
		else{
			console.log(data);
			res.send(data);
	//		mongoose.connection.close();
		}
		mongoose.connection.close();
	});
});

app.put("/api/changepass",function(req,res){
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	console.log(req.body);
	Signup.updateOne({username:req.body.uname,pass:req.body.cpass},{$set:{pass:req.body.npass}},function(err,data){
		if(err)
		{
			console.log(err);
			res.send("FAILED");
		//	mongoose.connection.close();
		}
		else{
			console.log(data);
			res.send(data);
		//	mongoose.connection.close();
		}
		mongoose.connection.close();
	});
});

app.get("/api/fetchprods", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	manageproduct.find({catid:req.query.catid,subcatid:req.query.scatid},function(err, data) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
	//mongoose.connection.close();
	}
	else
	{
	console.log(data);
	res.send(data);
	//mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });

   app.get("/api/fetchprodsbyid", function(req, res) {
	mongoose.connect("mongodb://localhost/myprojdb",{useNewUrlParser: true});
	manageproduct.find({_id:req.query.pid},function(err, data) {
	if (err)
	{
	console.log(err);
	res.send("Failed");
	//mongoose.connection.close();
	}
	else
	{
	console.log(data);
	res.send(data);
	//mongoose.connection.close();
	}
	mongoose.connection.close();
	});
   });

app.listen(process.env.PORT||8080);