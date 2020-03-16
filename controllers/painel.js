module.exports = (app) => {
    app.post('/app/panel', function(req, res) {
        console.log(req.body)

        const { paciente, tipo, local } = req.body;
        if(!paciente) return res.status(400).send('campo paciente é obrigatório');
        if(!tipo) return res.status(400).send('campo tipo é obrigatório');
        if(!local) return res.status(400).send('campo local é obrigatório');

        if (ownerSocket) {
            req.io.emit("senha_request", req.body);
        }
        res.json({ error: false, msg: 'Senha emitida com suceso' })
    });
};