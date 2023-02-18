const { user, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('books')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            console.log(parent);
const user = await User.findOne({ email });
if (!user) {
    throw new AuthenticationError('Incorrect credentials');
}
const correctPassword = await user.isCorrectPassword(password);
if (!correctPassword) {
    throw new AuthenticationError('Incorrect credentials');
}
const token = signToken(user);
return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true }
            );
            return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    deleteBook: async (parent, { bookId }, context) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
        );       
},
createUser: async (parent, args) => {
    const user = await User.create(args);
    const token = signToken(user);
    return { token, user };
},
getSingleUser: async (parent, { username }) => {
    const params = username ? { username } : {};
    return User.findOne(params).select('-__v -password');
},
},
};

module.exports = resolvers;