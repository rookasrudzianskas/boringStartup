//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";

const QuizScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Quiz'
        })
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.question}>What is the output?</Text>
            <Image resizeMode={'contain'} source={{uri: 'https://quizapp-app.s3.us-east-1.amazonaws.com/FirstQuestion.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaDGV1LWNlbnRyYWwtMSJHMEUCIQC1P4m5kJR%2Fr9QgiZd%2FVnfw8JETKEYtvYEzDfUK5BwMJQIgQLzRzqVQ%2BF5qmxpEH%2BvRSg%2FeqyVjq%2F6nKPAZamMUhlMq5AIISxAAGgw2MDUxMTE1NDc0NzUiDC4HZJurDBXI%2BM%2BcGCrBAqMVEZO4d8tCiKGy%2FAaNwNBZfpPG4eLppTc%2Bbsslsfmp1n%2BQ1a5ROeBg2nBoXx2gS%2Fv151f4Pk8YS5yLw0ekJjOuWRMelKVHlvqDPpoE%2FOz%2B%2BWtkJj6d4hfOSAA%2BtaPlPN4mzKf9Z%2BbW%2FIHr%2FAx63aqRMiMZfiOonPi4p7AclnPhIfOsF54CVdUEGTK6tumICSMEHiKhSuOFvvQlW4P%2FsmBFbIRVjvgGE17FRHWbTjuXgHZS%2FPg4v1l7IxPh07K6PMv5%2FXJ0oQ5qyo0qRpk5844PuuK6vDA6ytI6G1KU9Pz%2FN95mHW%2FymXSjG5aqHxwBmU3NsCRYY4cru1Bm24xjOOq9JiCmSXL2CGPqMhblRLpOdlPBGKQEtmXdnSVeURc8prjbVYdzOHzYPQvMfzXx%2FsPBrR0Bgs8e0CNuXrTfMEFtJjCHjsCaBjqzAmenpk1L%2FzAD1U0P4PfRgRCgqWqMdvmC37UjgNyR6%2B4rQkCACPfMIlQF8ak8%2FlfzWemjJ3G%2BYDO8xZ58qhsVnc3VlU8R%2BWyRbVmsSUF%2FUFnQZOvQxXewvNPUmZkt4htZYnVVYl6iKKe1Teak2L1o8Ysm%2FOONA%2FG2Yh0yHGX2B4%2FZxYA2b36SUu4RcI0%2BfwDDB2z56hTaZiaZavsEiFUlJnsgVU84TfBGiNdSEXIpOA2%2BHgLCq3j%2F1rdVr1wrzJWtOKo%2F3V3dyLiPpoYDkkPDHwxJKw4Xa6lMygx1AHsWjDRMXo6Jfb6mLwHmoisAmjxUDQlJhTl8U3h6pfVQm1O6PxNRd7uaAhixox9CLr4TD2eiXJSF9n8a6oGicv3U04laiR4MKOvhfKzk%2B21nAnhDON7Bz10%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221019T175423Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYZY3VOZJUJYP7GCD%2F20221019%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2781a0ab2e59b6b1f39a8457f02585cd31bcc81bedfe1208f721b3b2ad72c4ad'}} style={styles.questionImage} />

        {/*    Choices */}

        {/*    Button */}
        </View>
    );
};

export default QuizScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.white,
        padding: 10,
    },
    question: {
        fontSize: 20,
        fontWeight: '500',
    },
    questionImage: {
        width: '100%',
        height: 300,
    }
});
