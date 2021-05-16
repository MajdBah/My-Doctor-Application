export const saveUser = (req, res) => {
   req.checkBody('name')
      .notEmpty()
      .withMessage("الاسم مطلوب");

   req.checkBody('email')
      .notEmpty()
      .withMessage("البريد الإلكتروني مطلوب");

   req.checkBody('email')
      .isEmail()
      .withMessage("البريد الإلكتروني غير صالح");

   req.checkBody('password')
      .notEmpty()
      .withMessage("كلمة المرور مطلوبة");

   req.checkBody('userType')
      .notEmpty()
      .withMessage("نوع المستخدم مطلوب");
}