// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config({path: './config/.env'});

// Afficher la chaîne de connexion MongoDB dans la console
console.log("mongodb+srv://abdouazig58:3BJel6hzlAGXyQd9@cluster0.1xb0sdi.mongodb.net/");

// Importer les bibliothèques express et mongoose
const express = require('express');
const mongoose = require('mongoose');

// Créer une nouvelle application express
const app = express();
// Définir le port sur lequel le serveur sera lancé
const port = process.env.PORT || 3001

// Se connecter à la base de données MongoDB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connecté à la base de données"))
.catch((error) => console.log("Échec de la connexion à la base de données", error));

// Lancer le serveur express
app.listen(port, () => {
    console.log(`Le serveur fonctionne sur le port ${port}`);
});

// Importer le modèle User
const User = require('./models/User');


app.use(express.json())

app.get('/users', async (req, res) => {
    const users = await User.find({});
    res.send(users);
});

// Définir la route POST pour /users pour ajouter un nouvel utilisateur
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
});

// Définir la route PUT 
app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
});

// Définir la route DELETE 
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send('Utilisateur supprimé');
});
