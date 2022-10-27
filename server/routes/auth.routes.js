const Router = require('express')
const User = require('../models/User')
const router = new Router()
const bcryptjs = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')

router.post(
   '/registration',
   // параметр для валидации поля которые нужно проверять
   [
      check('email', 'Не коректный email').isEmail(),

      check('password', 'Не коретный пароль').isLength({ min: 3, max: 12 }),
   ],
   async (req, res) => {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Произошла ошибка', errors })
         }
         const { email, password } = req.body
         // Поиск в базе данных
         const candidate = await User.findOne({ email })
         if (candidate) {
            return res.status(409).json({
               message: 'Такой email уже существует',
            })
         }
         // шифрование пароля
         const hashPassword = await bcryptjs.hash(password, 8)
         // создание пользователя
         const user = new User({
            email,
            password: hashPassword,
         })
         // запись в базу данных пользователя
         await user.save()
         return res.status(200).json({ user, message: 'Пользователь создан' })
      } catch (e) {
         console.log(e)
         res.send({ message: 'Server error', e })
      }
   }
)

router.post(
   '/login',

   async (req, res) => {
      try {
         //    получавем переменные из запроса
         const { email, password } = req.body
         // ищем полученный email в базе данных
         const user = await User.findOne({ email })
         // проверяем данного user и если его нет то выдаем ошибку и сообщение
         if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' })
         }
         // сравниваем пароликоторые пришли через токен
         const isPassValid = bcryptjs.compareSync(password, user.password)
         if (!isPassValid) {
            return res.status(400).json({ message: 'Не коректный пароль' })
         }
         const token = jwt.sign(
            {
               id: user._id,
            },
            config.get('secretKey'),
            {
               expiresIn: '1h',
            }
         )
         return res.json({
            token,
            user: {
               id: user.id,
               email: user.email,
               diskSpace: user.diskSpace,
               usedSpace: user.usedSpace,
               avatar: user.avatar,
            },
         })
      } catch (e) {
         console.log(e)
         res.send({ message: `Server error ${e}` })
      }
   }
)

router.get(
   '/auth',
   authMiddleware,

   async (req, res) => {
      try {
         const user = await User.findOne({ _id: req.user.id })

         const token = jwt.sign(
            {
               id: user._id,
            },
            config.get('secretKey'),
            {
               expiresIn: '1h',
            }
         )
         return res.json({
            token,
            user: {
               id: user.id,
               email: user.email,
               diskSpace: user.diskSpace,
               usedSpace: user.usedSpace,
               avatar: user.avatar,
            },
         })
      } catch (e) {
         console.log(e)
         res.send({ message: `Server error ${e}` })
      }
   }
)

module.exports = router
