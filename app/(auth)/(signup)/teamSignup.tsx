import { globalStyles } from "@/styles/globalStyles";
import { View, ScrollView, Text } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/input";
import DefaultButton from "@/components/defaultButton";
import { teamSignupSchema, TeamSignupForm } from "@/schemas/teamSignup.schema";
import { SignupData, TeamData, useSignupStore } from "@/store/signupStore";
import { authStyles } from "@/styles/authStyles";
import { signUpWithEmail } from "@/utils/firebase/auth";
import { createUser } from "@/utils/firebase/users";
import { router } from "expo-router";

export default function TeamSignup() {
  const { signupData, setTeamData, clear } = useSignupStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeamSignupForm>({
    resolver: zodResolver(teamSignupSchema),
    defaultValues: {
      teamName: "",
      teamDiscriminator: "",
    },
  });

  const onSubmit: SubmitHandler<TeamSignupForm> = async (teamData) => {
    setTeamData(teamData);

    const finalPayload: TeamData & SignupData = {
      ...(signupData as SignupData),
      ...teamData,
    };

    const { user } = await signUpWithEmail(
      finalPayload.email,
      finalPayload.password,
    );

    try {
      await createUser(user, finalPayload);
      clear();
      router.push("/")
    } catch (e: any) {
      alert(e.message || "Failed");
    }
  };
  return (
    <ScrollView style={globalStyles.screen}>
      <Text style={globalStyles.title}>STEMM LABS</Text>

      <View style={authStyles.form}>
        <Text style={authStyles.subheading}>Create New Team</Text>

        <Controller
          control={control}
          name="teamName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Team Name"
              style={authStyles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Text style={authStyles.subheading}>OR</Text>

        <Text style={authStyles.subheading}>Join An Existing Team</Text>

        <Controller
          control={control}
          name="teamDiscriminator"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Team Discriminator"
              style={authStyles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {errors.teamName && (
          <Text style={globalStyles.error}>{errors.teamName.message}</Text>
        )}

        <DefaultButton
          title="Sign Up"
          style={{ marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
          disabled= {isSubmitting}
        />
      </View>
    </ScrollView>
  );
}
