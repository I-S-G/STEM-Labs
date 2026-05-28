import DefaultButton from "@/components/buttons/defaultButton";
import Input from "@/components/input";
import { View, Text } from "react-native";
import { globalStyles } from "@/styles/globalStyles";
import { TeamSettingStyles } from "@/styles/settingsStyles";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserStore } from "@/store/userStore";
import { changeTeamName } from "@/utils/firebase/teams";
import { teamNameSchema, TeamNameForm } from "@/schemas/teamName.schema";
import { router } from "expo-router";

export default function TeamName() {
  const user = useUserStore((s) => s.currentUser);
  const loadUser = useUserStore((s) => s.loadUser);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeamNameForm>({
    resolver: zodResolver(teamNameSchema),
    defaultValues: {
      teamName: user?.teamName ?? "",
    },
  });

  const onSubmit = async (data: TeamNameForm) => {
    try {
      if (!user) return;

      await changeTeamName(user.teamDiscriminator, data.teamName);

      await loadUser();

      alert("Team name updated");
      router.push("/(tabs)/settings")
    } catch (err: any) {
      alert(err.message || "Failed to update team name");
    }
  };

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.titleWithHeader}>Change Team Name</Text>

      <View style={TeamSettingStyles.form}>
        <Controller
          control={control}
          name="teamName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Team Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {errors.teamName && (
          <Text style={globalStyles.error}>{errors.teamName.message}</Text>
        )}

        <DefaultButton
          title={isSubmitting ? "Updating..." : "Change"}
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
