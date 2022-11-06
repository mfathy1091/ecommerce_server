const saltRounds = process.env.SALT_ROUND
const pepper = process.env.BCRYPT_PASSWORD
import bcrypt from 'bcrypt'

const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(
      password + pepper,
      parseInt(saltRounds as string)
    );

    return hashedPassword;
  } catch (error) {
    console.log(error)
  }
}

const comparePlainToHashed = async (originalPassword: string, hashedPassword: string) => {
  try {
    const isPasswordValid = await bcrypt.compare(originalPassword + pepper, hashedPassword)
    return isPasswordValid
  } catch (error) {
    console.log(error)
  }
}


export { hashPassword, comparePlainToHashed }