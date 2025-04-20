import { Modal, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import PassengerPick from './passegerPick'
import { Adult, Baby, Child, Close } from '@/assets/svgs'
import { useState } from 'react'
import { AppColors } from '@/utils/constant'

interface Passegers {
    adult: number,
    child: number,
    baby: number
}
type PassegerType = 'ADULT' | 'CHILD' | 'BABY';

const PassegerInput = ({
    handleClose,
    defaultValue,
    onConfirm
  }: {
    handleClose: () => void;
    defaultValue?: Passegers;
    onConfirm: (passegers: Passegers) => void;
  }) => {
    const [passegers, setPassegers] = useState<Passegers>(defaultValue || {
      adult: 1,
      child: 0,
      baby: 0
    });

    const handlePassagerChange = (newCount: number, passgerType: PassegerType) => {
        switch (passgerType) {
            case 'ADULT':
                setPassegers({ ...passegers, adult: newCount })
                break;
            case 'CHILD':
                setPassegers({ ...passegers, child: newCount })
                break;
            case 'BABY':
                setPassegers({ ...passegers, baby: newCount })
                break;
        }
    }

    return (
        <Modal
        transparent
        animationType="slide"
        visible={true}
        onRequestClose={() => {}}
        >
        <View style={styles.container}>
            <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                <View style={{ alignItems: 'center', paddingVertical: 15, position: 'relative', justifyContent:'center'}}>
                    <Text style={styles.title}>Chọn hành khách</Text>
                    <TouchableOpacity onPress={handleClose} style={{position: 'absolute', alignSelf: 'flex-end', right: 20}}>
                        <Close/>
                    </TouchableOpacity>
                </View>
                <View style={{borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: AppColors.GRAY, paddingVertical: 15}}>
                <PassengerPick
                    title='Người lớn'
                    description='Từ 12 tuổi trở lên'
                    icon = {<Adult/>}
                    passegerCount={passegers.adult}
                    passegerType='ADULT'
                    setPasseger={handlePassagerChange}
                />
                <PassengerPick
                    title='Trẻ em'
                    description='Từ 2 đến 11 tuổi'
                    icon = {<Child/>}
                    passegerCount={passegers.child}
                    passegerType='CHILD'
                    setPasseger={handlePassagerChange}
                />
                <PassengerPick
                    title='Em bé'
                    description='Dưới 2 tuổi'
                    icon = {<Baby/>}
                    passegerCount={passegers.baby}
                    passegerType='BABY'
                    setPasseger={handlePassagerChange}
                />
                </View>
                <TouchableOpacity style={{paddingTop: 15}} onPress={() => {
                    onConfirm(passegers);
                    handleClose();
                    }}>
                    <Text style={styles.button}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </View>
        </Modal>
    )
}
export default PassegerInput



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        padding: 10,
        backgroundColor: '#007AFF',
        color: '#fff',
        borderRadius: 5,
        paddingVertical: 17,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
    row:{
        flexDirection: "row"
    },
    close: {
        fontSize: 25,
        fontWeight: 'medium',
        color: "#666",
        // borderRadius:2,
        // borderWidth: 1,
        // backgroundColor: "red",
        height: 30,
        width: 30,
        textAlign: "center",
      },
})