import express from "express"
import {add_course, get_courses, get_course_by_id, update_course_by_id, delete_course_by_id} from "../controllers/courses.js"
const router = express.Router()


router.route("/")
  .post(add_course)
  .get(get_courses)
router.route("/:id")
  .get(get_course_by_id)
  .put(update_course_by_id)
  .delete(delete_course_by_id)

export default router;
