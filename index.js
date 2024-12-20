//imports
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

//config express 
const app = express()
const port = 3000

//convert body to json
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

//config handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//config css
app.use(express.static('public'))

//Post to insert new registers 
app.post('/machines/insertmachine', (req, res) => {
    const hostname = req.body.hostname
    const patrimonio = req.body.patrimonio
    const modelo = req.body.modelo
    const os = req.body.os
    const type = req.body.type

    const query = `INSERT INTO machine (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)`
    const data = ['hostname', 'patrimonio', 'modelo', 'type', 'os', hostname, patrimonio, modelo, type, os]

    conn.query(query, data, function (err, data) {
        if (err) {
            console.log(err)
        }

        console.log(data);
        res.json({ redirectUrl: "/" });

    })

})

//view get machines
app.get('/', (req, res) => {

    const query = 'SELECT * FROM machine'
    const queryAmount = `SELECT count(*) as amount FROM machine`

    conn.query(query, function (er, data1) {

        conn.query(queryAmount, function (err, data) {
            const machineAmount = data[0].amount

            if (er) {
                console.log(er)
                return
            }

            const machines = data1
            res.render('home', { machines, machineAmount })
        })

    })

})

//Edit 
app.get('/:id', (req, res) => {

    const id = req.params.id

    const query = `SELECT * FROM ?? where id = ?;`
    const data = ['machine', id]

    conn.query(query, data, function (err, data) {

        if (err) {
            console.log(err)
            return
        }


        const machine = data[0]
        res.send( { machine })

    })


})

//Post to update a machine information
app.post('/machine/edited', (req, res) => {
    const id = req.body.id
    const hostname = req.body.hostname
    const patrimonio = req.body.patrimonio
    const modelo = req.body.modelo
    const os = req.body.os
    const type = req.body.type

    const query = `UPDATE machine SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['hostname', hostname, 'patrimonio', patrimonio, 'modelo', modelo, 'os', os, 'type', type, 'id', id]

    conn.query(query, data, (err, data) => {

        if (err) {
            console.log(err)
            return
        }

        res.send('Informações atualizadas!')

    })

})


//Search by machine id 
app.get('/getmachine/searchmachinebyid', (req, res) => {

    const id = req.query.machineid

    const query = `SELECT * FROM ?? where id = ?;`
    const data = ['machine', id]


    conn.query(query, data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const machine = data
        res.render('searchmachinebyid', { machine })
    })

})

//Response to filter by 
app.get('/getmachine/filterbytype', (req, res) => {
    const { onlyLaptops, onlyDesktops, onlyServers } = req.query;

    // Mapeando os tipos de máquinas e suas condições
    const types = {
        onlyLaptops: 'Notebook',
        onlyDesktops: 'Desktop',
        onlyServers: 'Servidor',
    };

    // Verifica qual tipo foi solicitado
    const filterKey = Object.keys(types).find(key => req.query[key] === 'on');

    if (!filterKey) {
        return 'alert("dasd")'
    }

    const queryAmount = 'SELECT COUNT(*) FROM machine WHERE type= ?;'
    const query = 'SELECT * FROM machine WHERE type = ?';
    const type = types[filterKey];

    conn.query(query, [type], (err, data1) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar máquinas.');
        }

        const amount = conn.query(queryAmount, [type], (err, data) => {
        })

        res.render('filterbytype', { machineFiltered: data1, type, amount });

    });
});


//Response to invalid filter
app.get('/noneselected', (req, res) => {

    res.send('Por favor, selecionar uma opção!')

})

//Delete registers 
app.post('/deletemachine', (req, res) => {

    const id = req.body.id

    const query = `DELETE FROM machine WHERE ?? = ?`
    const data = ['id', id

    ]

    conn.query(query, data, (err, data) => {

        if (err) {
            console.log(err)
            return res.status(500).send('Erro ao apagar máquina.')
        }
        res.send('Máquina apagada com sucesso!')
    })
})

//estabelecendo conexao com banco e iniciando servidor

//config mysql
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '159188',
    database: 'estoque',
})

conn.connect((err) => {

    if (err) {
        console.log(err)
    }

    console.log('You are connected');
    app.listen(port)
})
