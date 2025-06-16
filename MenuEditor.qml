import QtQuick 2.15
import QtQuick.Controls 2.15

Dialog {
    id: menuEditor
    title: "Edit Menu Item"
    modal: true

    property var item: null

    Column {
        spacing: 10
        padding: 10

        TextField {
            id: itemName
            text: item ? item.name : ""
            placeholderText: "Menu Item Name"
            onTextChanged: item.name = text
        }

        TextArea {
            id: itemDescription
            text: item ? item.description : ""
            placeholderText: "Menu Item Description"
            height: 100
            onTextChanged: item.description = text
        }

        Row {
            spacing: 10

            Button {
                text: "Save"
                onClicked: {
                    // Save logic here
                    console.log("Saved:", item)
                    menuEditor.visible = false
                }
            }

            Button {
                text: "Delete"
                color: "red"
                onClicked: {
                    // Delete logic here
                    if (item) {
                        var model = menuList.model
                        model.remove(item)
                        menuList.selectedItem = null
                        console.log("Deleted:", item)
                        menuEditor.visible = false
                    }
                }
            }

            Button {
                text: "Cancel"
                onClicked: {
                    menuEditor.visible = false
                }
            }
        }
    }
}