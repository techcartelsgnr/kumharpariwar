import React, { useEffect, useCallback, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    RefreshControl,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

// api
import { useSelector, useDispatch } from 'react-redux';
import StatusBarPage from '../../components/StatusBarPage';
import HeaderCommon from '../../components/HeaderCommon';
import { COLORS } from '../../theme/theme';
import { fetchTerms } from '../../redux/slices/MoreRepoSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsConditionScreen() {
    const { width } = useWindowDimensions();
    const { token } = useSelector(state => state.auth);
    const { terms } = useSelector(state => state.reports);
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(fetchTerms({ token })).then(() => setRefreshing(false));
    }, [dispatch, token]);

    useEffect(() => {
        dispatch(fetchTerms({ token }));
    }, []);

    // Dummy content for terms
    // const terms = `
    //   <h1 style="font-family: 'Baloo2-Bold';">Terms & Conditions</h1>
    //   <p style="font-family: 'Baloo2-Bold';">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod justo quis justo elementum posuere. Nulla facilisi. Phasellus vitae diam eu velit bibendum varius. Curabitur vel nunc nec ligula laoreet suscipit. Nam varius ligula eget ligula posuere, sed fermentum nulla interdum.</p>
    //   <h2 style="font-family: 'Baloo2-Bold';">Section 1: Definitions</h2>
    //   <p style="font-family: 'Baloo2-Bold';">Integer accumsan, mauris et interdum consequat, urna leo fermentum justo, non semper lectus lorem at orci. Proin in neque a nibh condimentum aliquam. Nullam eget suscipit magna.</p>
    //   <ul style="font-family: 'Baloo2-Bold';">
    //     <li>Definition 1</li>
    //     <li>Definition 2</li>
    //     <li>Definition 3</li>
    //   </ul>
    //   <h2 style="font-family: 'Baloo2-Bold';">Section 2: Responsibilities</h2>
    //   <p style="font-family: 'Baloo2-Bold';">Quisque efficitur nibh vitae ipsum mollis, at fermentum lorem laoreet. Aenean fringilla, justo et suscipit placerat, lorem sapien pharetra justo, ac posuere neque turpis non ante.</p>
    //   <ol style="font-family: 'Baloo2-Bold';">
    //     <li>Responsibility 1</li>
    //     <li>Responsibility 2</li>
    //     <li>Responsibility 3</li>
    //   </ol>
    // `;

    return (
        <>
            {/* <StatusBarPage /> */}
            <SafeAreaView
                style={{ flex: 1, paddingBottom: 10, backgroundColor: COLORS.blue }}>
                <HeaderCommon headername="Terms & Conditions" />
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.white }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#090979']} // Color of the refresh indicator
                        />
                    }>
                    <View style={styles.termsBox}>
                        <RenderHtml
                            contentWidth={width}
                            source={{ html: terms }}
                            baseStyle={styles.termsContentText}
                            tagsStyles={tagsStyles}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const tagsStyles = {
    p: {
        margin: 0, // Remove margins for paragraphs
        paddingTop: 5,
        paddingBottom: 5,
    },
    h1: {
        margin: 0,
        paddingTop: 5,
    },
    h2: {
        margin: 0,
        padding: 0,
    },
    ul: {
        margin: 0,
        paddingLeft: 20, // Example: Indent list items
    },
    ol: {
        margin: 0,
        paddingLeft: 20, // Example: Indent list items
    },
    // Add more tag styles as needed
};

const styles = StyleSheet.create({
    termsBox: {
        // marginHorizontal: 10,
        backgroundColor: COLORS.white,
    },
    termsContentText: {
        fontSize: 12,
        color: COLORS.dark,
        padding: 10,
        // fontFamily: 'Baloo2-Bold', // No need to specify here if inline styles are used in terms
    },
});
