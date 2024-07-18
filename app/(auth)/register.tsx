import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../(services)/api/api';

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().min(6, "Too Short!").required("Password is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Password confirmation is Required"),
});

export default function Register() {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<string>("");

  const mutation = useMutation({
    mutationFn: registerUser,
    mutationKey: ["register"],
  });

  console.log(mutation);

  return (
    <View>
      <Text style={styles.title}>Register</Text>
      {mutation.isError ? (
        <Text style={styles.errorText}>
          {(mutation.error as any)?.response?.data?.message}
        </Text>
      ) : null}
      {mutation.isSuccess ? (
        <Text style={styles.successText}>
          {(mutation.error as any)?.response?.data?.message}
        </Text>
      ) : null}
      <Formik
        initialValues={{
          username: "erick",
          email: "erick@gmail.com",
          password: "123456",
          confirmPassword: "123456",
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values: FormValues, actions: FormikHelpers<FormValues>) => {
          const data = {
            username: values.username,
            email: values.email,
            password: values.password,
          };
          try {
            await mutation.mutateAsync(data);
            setMessage("Registration successful!");
            setMessageType("success");
            setTimeout(() => {
              setMessage("");
              router.push("/(tabs)");
            }, 2000); // Redirect after 2 seconds
          } catch (error) {
            setMessage((error as any)?.response?.data?.message);
            setMessageType("error");
          }
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
              placeholder="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              keyboardType="default"
            />
            {errors.username && touched.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}
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
              onPress={handleSubmit as any}
              disabled={mutation.isPending}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  successText: {
    color: "green",
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})