<template>
<v-container>
    <v-row no-gutters>
        <v-col cols="2" sm="6">
            <avataaars
            style="width: 300px"
            :clotheType="avatar.clotheType"
            :accessoriesType="avatar.accessoriesType"
            :clotheColor="avatar.clotheColor"
            :eyebrowType="avatar.eyebrowType"
            :eyeType="avatar.eyeType"
            :facialHairColor="avatar.facialHairColor"
            :facialHairType="avatar.facialHairType"
            :hairColor="avatar.hairColor"
            :graphicType="avatar.graphicType"
            :mouthType="avatar.mouthType"
            :skinColor="avatar.skinColor"
            :topType="avatar.topType"
            :topColor="avatar.topColor"
            >
            </avataaars>
        </v-col>
        <v-col cols="2" sm="6">
            <v-form>
            <v-container>
                <v-select
                v-model="avatar.accessoriesType"
                :items="accessoriesTypes"
                label="Accessory"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.clotheType"
                :items="clotheTypes"
                label="Cloth type"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.clotheColor"
                :items="clotheColors"
                label="Cloth color"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.eyebrowType"
                :items="eyebrowTypes"
                label="Eyebrow type"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.eyeType"
                :items="eyeTypes"
                label="Eye type"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.facialHairColor"
                :items="facialHairColors"
                label="Facial hair color"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.facialHairType"
                :items="facialHairTypes"
                label="Facial hair types"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.hairColor"
                :items="hairColors"
                label="Hair color"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.graphicType"
                :items="graphicTypes"
                label="Graphic"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.mouthType"
                :items="mouthTypes"
                label="Mouth"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.skinColor"
                :items="skinColors"
                label="Skin color"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.topType"
                :items="topTypes"
                label="Hair/hat"
                @change="updateAvatar"
                outlined
                ></v-select>
                <v-select
                v-model="avatar.topColor"
                :items="topColors"
                label="Hat color"
                @change="updateAvatar"
                outlined
                ></v-select>
            </v-container>
            </v-form>
        </v-col>
    </v-row>
</v-container>
</template>
<script>
import Avataaars from 'vuejs-avataaars'

import Vue from 'vue'
const accessoriesType = [
    'Blank',
    'Kurt',
    'Prescription01',
    'Prescription02',
    'Round',
    'Sunglasses',
    'Wayfarers'
]
const clotheType = [
    'BlazerShirt',
    'BlazerSweater',
    'CollarSweater',
    'GraphicShirt',
    'Hoodie',
    'Overall',
    'ShirtCrewNeck',
    'ShirtScoopNeck',
    'ShirtVNeck'
]
const clotheColor = [
    'Black',
    'Blue01',
    'Blue02',
    'Blue03',
    'Gray01',
    'Gray02',
    'Heather',
    'PastelBlue',
    'PastelGreen',
    'PastelOrange',
    'PastelRed',
    'PastelYellow',
    'Pink',
    'Red',
    'White'
]
const eyebrowType = [
    'Angry',
    'AngryNatural',
    'Default',
    'DefaultNatural',
    'FlatNatural',
    'RaisedExcited',
    'RaisedExcitedNatural',
    'SadConcerned',
    'SadConcernedNatural',
    'UnibrowNatural',
    'UpDown',
    'UpDownNatural'
]
const eyeType = [
    'Close',
    'Cry',
    'Default',
    'Dizzy',
    'EyeRoll',
    'Happy',
    'Hearts',
    'Side',
    'Squint',
    'Surprised',
    'Wink',
    'WinkWacky'
]
const facialHairColor = [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'PastelPink',
    'Platinum',
    'Red',
    'SilverGray'
]
const facialHairType = [
    'Blank',
    'BeardMedium',
    'BeardLight',
    'BeardMagestic',
    'MoustacheFancy',
    'MoustacheMagnum'
]
const graphicType = [
    'Bat',
    'Cumbia',
    'Deer',
    'Diamond',
    'Hola',
    'Pizza',
    'Resist',
    'Selena',
    'Bear',
    'SkullOutline',
    'Skull'
]
const hairColor = [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'PastelPink',
    'Platinum',
    'Red',
    'SilverGray'
]
const mouthType = [
    'Concerned',
    'Default',
    'Disbelief',
    'Eating',
    'Grimace',
    'Sad',
    'ScreamOpen',
    'Serious',
    'Smile',
    'Tongue',
    'Twinkle',
    'Vomit'
]
const skinColor = [
    'Tanned',
    'Yellow',
    'Pale',
    'Light',
    'Brown',
    'DarkBrown',
    'Black'
]
const topType = [
    'NoHair',
    'Eyepatch',
    'Hat',
    'Hijab',
    'Turban',
    'WinterHat1',
    'WinterHat2',
    'WinterHat3',
    'WinterHat4',
    'LongHairBigHair',
    'LongHairBob',
    'LongHairBun',
    'LongHairCurly',
    'LongHairCurvy',
    'LongHairDreads',
    'LongHairFrida',
    'LongHairFro',
    'LongHairFroBand',
    'LongHairNotTooLong',
    'LongHairShavedSides',
    'LongHairMiaWallace',
    'LongHairStraight',
    'LongHairStraight2',
    'LongHairStraightStrand',
    'ShortHairDreads01',
    'ShortHairDreads02',
    'ShortHairFrizzle',
    'ShortHairShaggyMullet',
    'ShortHairShortCurly',
    'ShortHairShortFlat',
    'ShortHairShortRound',
    'ShortHairShortWaved',
    'ShortHairSides',
    'ShortHairTheCaesar',
    'ShortHairTheCaesarSidePart'
]
const topColor = [
    'Black',
    'Blue01',
    'Blue02',
    'Blue03',
    'Gray01',
    'Gray02',
    'Heather',
    'PastelBlue',
    'PastelGreen',
    'PastelOrange',
    'PastelRed',
    'PastelYellow',
    'Pink',
    'Red',
    'White'
]

class Avataaar {
    accessoriesType = accessoriesType[2]
    clotheType = clotheType[1]
    clotheColor = clotheColor[0]
    eyebrowType = eyebrowType [2]
    eyeType = eyeType[2]
    facialHairColor = facialHairColor[2]
    facialHairType = facialHairType[0]
    graphicType = graphicType[0]
    hairColor = hairColor[0]
    mouthType = mouthType[1]
    skinColor = skinColor[0]
    topType = topType[16]
    topColor = topColor[0]
}
export default Vue.extend({
    components: {
        Avataaars
    },
    props: {
        avatar: {
            default() {return new Avataaar()},
            type: Avataaar
        }
    },
    emits: {
        avatar: {
            type: Avataaar
        }
    },
    data() {
        return {
            accessoriesTypes: accessoriesType,
            clotheTypes: clotheType,
            clotheColors: clotheColor,
            eyebrowTypes: eyebrowType,
            eyeTypes: eyeType,
            facialHairColors: facialHairColor,
            facialHairTypes: facialHairType,
            graphicTypes: graphicType,
            hairColors: hairColor, 
            mouthTypes: mouthType,
            skinColors: skinColor,
            topTypes: topType,
            topColors: topColor,
        }
    },
    methods: {
        updateAvatar() {
            this.$emit("avatar", this.avatar);
        }
    }
})
</script>