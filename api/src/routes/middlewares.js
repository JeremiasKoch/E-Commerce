
const checkAuth = (req, res, next) => { 
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        console.log('Autenticado');
        next();
    }
    else{
        console.log('Sin autenticar')
    }
}

const isAdmin = (req, res, next) => {
    console.log('ROLE', req.user.role);
    req.user.role === 'admin' ? next() : res.send({ msg: 'You are not admin'});
}

const isClient = (req, res, next) => {
    console.log('ROLE', req.user.role);
    req.user.role === 'client' ? next() : res.send({ msg: 'You are not client'});
}

module.exports = { checkAuth, isAdmin, isClient };