/**
 * Global setup hook for mocha.
 * This runs before any test cases.
 */
const User = require(`../persistence/${process.env.DB_PROTOCOL}/models/user.model`)

before(async () => {
    await User.deleteMany({})
})