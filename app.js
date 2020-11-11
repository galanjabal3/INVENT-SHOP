const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();
const port = 10000;

app.set('view engine','hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var koneksi = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'invent_shop'
});

koneksi.connect((err) =>{
    if(err) throw err;
    console.log('Koneksi Databases Berhasil Disambung')
});

//pelanggan
app.get('/', (req, res) => {
    koneksi.query('SELECT * FROM pelanggan',(err, hasil) => {
        if(err) throw err;
        res.render('pelanggan.hbs', {
            Hal1: 'PELANGGAN',
            data: hasil
        });
    });
});

app.post('/pelanggan', (req, res) =>{
    var nama = req.body.inputnama;
    var alamat = req.body.inputalamat;
    var telepon = req.body.inputtelepon;
    koneksi.query('INSERT INTO pelanggan(nama,alamat,telepon) values (?,?,?)',
    [ nama, alamat, telepon],
    (err, hasil) =>{
        if(err) throw err;
        res.redirect('/');
    }
    )
})

app.get('/hapus/:Nama',(req, res) =>{
    var Nama = req.params.Nama;
    koneksi.query("DELETE from pelanggan where Nama=?",
     [Nama], (err, hasil) =>{
         if(err) throw err;
         res.redirect('/')
     }
    )
})

//penjualan
app.get('/data', (req, res) => {
    koneksi.query('SELECT * FROM penjualan',(err, hasil) => {
        if(err) throw err;
        res.render('penjualan.hbs', {
            Hal2: 'PENJUALAN',
            data: hasil
        });
    });
});

app.post('/penjualan', (req, res) =>{
    var Nama_Barang = req.body.inputnamabarang;
    var Jumlah = req.body.inputjumlah;
    var Harga = req.body.inputharga;
    koneksi.query('INSERT INTO penjualan(nama_barang,jumlah,harga) values (?,?,?)',
    [ Nama_Barang, Jumlah, Harga ],
    (err, hasil) =>{
        if(err) throw err;
        res.redirect('/data');
    }
    )
})

app.get('/delete/:Nama_Barang',(req, res) =>{
    var Nama_Barang = req.params.Nama_Barang;
    koneksi.query("DELETE from penjualan where Nama_Barang=?",
     [Nama_Barang], (err, hasil) =>{
         if(err) throw err;
         res.redirect('/data')
     }
    )
})

//pendapatan
app.get('/pendapatan', (req, res) => {
    koneksi.query('SELECT * FROM pendapatan',(err, hasil) => {
        if(err) throw err;
        res.render('pendapatan.hbs', {
            Hal3: 'PENDAPATAN',
            data: hasil
        });
    });
});

app.post('/pendapatan', (req, res) =>{
    var keterangan = req.body.inputketerangan;
    var jumlah = req.body.inputjumlah;
    koneksi.query('INSERT INTO pendapatan(keterangan,jumlah) values (?,?)',
    [ keterangan, jumlah],
    (err, hasil) =>{
        if(err) throw err;
        res.redirect('/pendapatan');
    }
    )
})

app.get('/back/:Id_Transaksi',(req, res) =>{
    var Id_Transaksi = req.params.Id_Transaksi;
    koneksi.query("DELETE from pendapatan where Id_Transaksi=?",
     [Id_Transaksi], (err, hasil) =>{
         if(err) throw err;
         res.redirect('/pendapatan')
     }
    )
})

//link 

app.get('/pelanggan',(req, res) =>{
    res.render( __dirname + '/views/pelanggan.hbs')
});

app.get('/penjualan', (req, res) =>{
    res.render(__dirname + '/views/penjualan.hbs')
});

app.get('/pendapatan',(req, res) =>{
    res.render( __dirname + '/views/pendapatan.hbs')
});

app.get('/home',(req, res) =>{
    res.render( __dirname + '/views/home.hbs')
});

app.listen(port, () =>{
    console.log(`App berjalan pada port ${port}`);
});