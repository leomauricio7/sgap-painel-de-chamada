module.exports = (app) => {
    app.post('/app/panel', function(req, res) {
        console.log(req.body)
        const ownerSocket = req.connectedUsers[req.body.idClinica];
        if (ownerSocket) {
            req.io.to(ownerSocket).emit("senha_request", req.body);
        }
        res.json({ error: false, msg: 'Senha emitida com suceso' })
    });
};