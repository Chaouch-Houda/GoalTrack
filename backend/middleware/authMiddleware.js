import jwt from'jsonwebtoken';

//un middleware pour vérifier les jetons JWT (JSON Web Tokens) dans les requêtes entrantes sur votre serveur Express. on l'utilise pour les requetes qui oblige que l'utilisateur soit connecté pour pouvoir les faire(updateData) 
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; //Cette ligne est censée extraire le jeton JWT du champ d'en-tête "Authorization" de la requête.
    console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  jwt.verify(token, process.env.SECRET_KEY , (err, user) => {
    if (err) {
      console.error(err); // Imprime l'erreur dans la console
      return res.status(403).json({ message: 'Token invalide' });
    }

    req.user = user;
    next(); // Poursuivre le traitement de la requête
  });
};

export default verifyToken;

