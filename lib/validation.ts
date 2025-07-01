import z from "zod";

export const userSignupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase and number'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^\+?[\d\s-()]+$/, 'Invalid phone number'),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    dob: z.string().min(1, 'Date of birth is required'),
    gender: z.enum(['Male', 'Female', 'Others'], {
        required_error: 'Please select a gender',
    }),
})

export const user_loginEmailSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const user_loginPhoneSchema = z.object({
    phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^\+?[\d\s-()]+$/, 'Invalid phone number'),
});

export const user_profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').regex(/^\+?[\d\s-()]+$/, 'Invalid phone number'),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    dob: z.date(),
    gender: z.enum(['Male', 'Female', 'Others'], {
        required_error: 'Please select a gender',
    }),
})


export type user_LoginEmailForm = z.infer<typeof user_loginEmailSchema>;
export type user_LoginPhoneForm = z.infer<typeof user_loginPhoneSchema>;

export const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
] as const;


export const formFieldConfig = {
  name: {
    label: "Full Name",
    editable: false,
    required: true,
    maxLength: 155
  },
  email: {
    label: "Email Address",
    editable: false,
    required: true,
    maxLength: 255
  },
  phone: {
    label: "Phone Number",
    editable: true,
    required: true,
    minLength: 10,
    maxLength: 20
  },
  dob: {
    label: "Date of Birth",
    editable: true,
    required: true
  },
  gender: {
    label: "Gender",
    editable: true,
    required: true,
    options: genderOptions
  },
  bio: {
    label: "Bio",
    editable: true,
    required: false,
    maxLength: 500,
    rows: 4
  }
} as const;