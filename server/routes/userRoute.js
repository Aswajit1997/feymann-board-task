import express from 'express'
import {registerUser,getUser,allUsers} from '../controllers/userContoller.js'
import {addTopic,usersTopic} from '../controllers/topicsController.js'

const router=express.Router();


router.get('/',allUsers)
router.post('/register',registerUser)

router.get('/:_id',getUser)

//add topic
router.post('/:_id/addtopic',addTopic)
router.get('/:_id/userstopic',usersTopic)


export default router