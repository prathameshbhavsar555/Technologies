exports.isAdmin = (req, res, next) => {
  if (req.session.role === "admin") {
    next();
  } else {
  return res.redirect("/login");
  }
};

exports.isUser = (req, res, next) => {
  if (req.session.role === "user") {
    next();
  } else {
    return res.redirect("/login");
  }
};
exports.checkLoggedIn = (req, res, next) => {
    const rol=req.session.role;
  
    if(rol==="admin"){
    return res.redirect("/dasboard");
    }else if(rol==="staff"){
    return res.redirect("/udashboard");
    }
        next();
    
  
};
