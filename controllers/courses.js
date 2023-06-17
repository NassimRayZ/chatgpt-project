import asyncHandler from "express-async-handler"
import prisma from "../db/prisma.js"
import { get_category, prompt } from "./chatgpt.js"
const async_handler = asyncHandler
// @desc  Add course
// @route POST /api/courses
const add_course = async_handler( async (req, res) => {
  const {
    title,
  } = req.body

  if (title == null ) {
    res.status(400)
    throw new Error("Cannot create course without title")
  }

  const category = await get_category(title)
  const history = []
  const user_input = `here is a course title: ${title}, generate a chapter for the course`
  await prompt(user_input, history)
  const created_course = await prisma.course.create({
    data: {
      title,
      category,
      history 
    }
  })
  res.status(201).json(created_course)
})

// @desc  Get all courses
// @route GET /api/courses
const get_courses = async_handler( async (req, res) => {
  const course = await prisma.course.findMany()
  res.status(200).json(course)
})

// @desc Get item by id from cart
// @route GET /api/cart/:id
const get_course_by_id = async_handler( async (req, res) => {
  const course_id = req.params.id
  const course = await prisma.course.findUnique({
    where: { id : course_id},
  })

  if (course) {
    res.json(course)
  }else {
    res.status(404)
    throw new Error("Course Not Found")
  }
})

// @desc Update course by id
// @route PUT /api/courses/:id
const update_course_by_id = async_handler( async (req, res) => {
  const course_id = req.params.id
  try {

    const course = await prisma.course.findUnique({
      where: { id : course_id},
    })
    const { title=course.title,
            category=course.category,
            user_input=null, 
            history=course.history } = req.body

    if (user_input){
      await prompt(user_input, history)
    }

    const updated_course = await prisma.course.update({
        where: {
          id: course_id
        },
        data: {
          title,
          category,
          history,
        }
      })
    res.status(200).json(updated_course)
  }catch (e){
    res.status(400)
    throw new Error("Course Not Found")
  }
})


// @desc Delete course by id 
// @route DELETE /api/courses/:id
const delete_course_by_id = async_handler( async (req, res) => {
  const course_id = req.params.id
  console.log(course_id)
  try{
    const deleted_course = await prisma.course.delete({
      where: {
        id: course_id
      }
    })
    res.status(200).json(deleted_course)
  } catch {
    res.status(404)
    throw new Error("course Not Found")
  }
})
export { delete_course_by_id, update_course_by_id, get_course_by_id, get_courses, add_course}

