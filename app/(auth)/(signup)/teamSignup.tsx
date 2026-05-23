import { globalStyles } from "@/styles/globalStyles";
import { router, Link } from "expo-router";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";


import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/input";
import DefaultButton from "@/components/defaultButton";
import { teamSignupSchema, TeamSignupForm } from "@/schemas/teamSignup.schema";
import { useSignupStore } from "@/store/signupStore";


export default function TeamSignup() {

  const { signupData, setTeamData, clear } = useSignupStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamSignupForm>({
    resolver: zodResolver(teamSignupSchema),
    defaultValues: {
      teamName: "",
      teamDiscriminator: "",
    },
  });

const onSubmit:SubmitHandler<TeamSignupForm> = (teamData) => {
  setTeamData(teamData);

  const finalPayload = {
    ...signupData,
    ...teamData,
  };

  alert("CREATE USER:" + JSON.stringify(finalPayload));
  clear();
  router.push("/");
};
  return (
    <ScrollView style={globalStyles.screen}>
      <Text style={globalStyles.title}>STEMM LABS</Text>

      <View style={styles.form}>
        <Text style={styles.subheading}>
          Create New Team
        </Text>

        <Controller
          control={control}
          name="teamName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Team Name"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Text style={styles.subheading}>OR</Text>

        <Text style={styles.subheading}>
          Join An Existing Team
        </Text>

        <Controller
          control={control}
          name="teamDiscriminator"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Team Discriminator"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {errors.teamName && (
          <Text style={styles.error}>
            {errors.teamName.message}
          </Text>
        )}

        <DefaultButton
          title="Sign Up"
          style={{ marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <Link href="/login">
        <Text style={styles.signupLink}>Logout</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    marginBottom: 40,
  },
  signupLink: {
    textAlign: "center",
    color: "#ea00ff",
    textDecorationLine: "underline",
  },
  subheading: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});