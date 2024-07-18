import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'expo-router';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  email: Yup.string().email("Invalid email").required(" Email is Required"),
  password: Yup.string().min(6, "Too Short!").required("Password is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Password confirmation is Required"),
});

export default function register() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const mutation = useMutation({
    mutationFn: registerUser,
    mutationKey: ["register"],
  });

  console.log(mutation);

  return (
    <View>
      <Text style={styles.title}>Register</Text>
       {mutation?.isError ? (
        <Text style={styles.errorText}>
          {mutation?.error?.response?.data?.message}
        </Text>
      ) : null}
      {mutation?.isSuccess ? (
        <Text style={styles.successText}>
          {mutation?.error?.response?.data?.message}
        </Text>
      ) : null}
      <Formik
        initialValues={{
          email: "atom@gmail.com",
          password: "123456",
          confirmPassword: "123456",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          const data = {
            email: values.email,
            password: values.password,
          };
          mutation
            .mutateAsync(data)
            .then(() => {
              setMessage("Registration successful!");
              setMessageType("success");
              setTimeout(() => {
                setMessage("");
                router.push("/(tabs)");
              }, 2000); // Redirect after 2 seconds
            })
            .catch((error) => {
              setMessage(error?.response?.data?.message);
              setMessageType("error");
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={mutation.isLoading}
            >
              {mutation.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({})