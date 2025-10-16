import NintendoGame from '../models/NintendoGame.js';

export const getAll = async(req, res) => {
    // Logic to fetch all users from a database or other source
    //res.status(200).json({ message: 'Getting all users' });

    let result = await NintendoGame.findOne({
        where: {
            id: 2,
        },
    });

    res.json(result);
};