import { globalStyles } from "@/styles/globalStyles";
import { router, Link } from "expo-router";
import { View, ScrollView, Text } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/input";
import DefaultButton from "@/components/defaultButton";
import { signupSchema, SignupForm } from "@/schemas/signup.schema";
import { useSignupStore } from "@/store/signupStore";
import { authStyles } from "@/styles/authStyles";

export default function Signup() {
  const { setSignupData } = useSignupStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      retypePassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    setSignupData(data);
    alert(JSON.stringify(data));
    router.push("/teamSignup");
  };

  return (
    <ScrollView style={globalStyles.screen}>
      <Text style={globalStyles.title}>STEMM LABS</Text>

      <View style={authStyles.form}>
        <Text style={authStyles.subheading}>Personal Details</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Name"
              style={authStyles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {errors.name && (
          <Text style={authStyles.error}>{errors.name.message}</Text>
        )}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              style={authStyles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        {errors.email && (
          <Text style={authStyles.error}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              style={authStyles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />
          )}
        />

        {errors.password && (
          <Text style={authStyles.error}>{errors.password.message}</Text>
        )}

        <Controller
          control={control}
          name="retypePassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Retype Password"
              style={authStyles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />
          )}
        />

        {errors.retypePassword && (
          <Text style={authStyles.error}>{errors.retypePassword.message}</Text>
        )}

        <DefaultButton
          title="Next"
          style={{ marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
          disabled= {isSubmitting}
        />
      </View>

      <Link href="/login">
        <Text style={authStyles.signupLink}>Login Instead</Text>
      </Link>
    </ScrollView>
  );
}
