const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'Univalle',
    server: 'MSI\\SQLEXPRESS', 
    database: 'DB_Hotel',
    options: {
        encrypt: true, 
        trustServerCertificate: true 
    }
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('SQL Server Connected');
    } catch (err) {
        console.error(`Database connection failed: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
