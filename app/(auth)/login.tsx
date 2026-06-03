import { createGlobalStyles } from "@/styles/globalStyles";
import { Link } from "expo-router";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/input";
import DefaultButton from "@/components/buttons/defaultButton";
import { loginSchema, LoginForm } from "@/schemas/login.schema";
import { authStyles } from "@/styles/authStyles";
import { signInWithEmail } from "@/utils/firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

export default function Login() {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await signInWithEmail(data.email, data.password);
      Alert.alert("Success", "Logged In");
    } catch (e: any) {
      Alert.alert("Failed", e.message || "Failed to Login");
    }
  };

  return (
    <SafeAreaView style={globalStyles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Text style={globalStyles.title}>STEMM LABS</Text>

        <View style={authStyles.form}>
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
            <Text style={globalStyles.error}>{errors.email.message}</Text>
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
            <Text style={globalStyles.error}>{errors.password.message}</Text>
          )}

          <DefaultButton
            title="Login"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
        </View>

        <Link href="/signup">
          <Text style={authStyles.signupLink}>Signup Instead</Text>
        </Link>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
