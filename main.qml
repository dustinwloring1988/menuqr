import QtQuick 2.15
import QtQuick.Controls 2.15

ApplicationWindow {
    visible: true
    width: 800
    height: 600
    title: "MenuQR"

    // Search bar at the top
    Column {
        anchors.top: parent.top
        anchors.horizontalCenter: parent.horizontalCenter
        spacing: 10
        padding: 10

        TextField {
            id: searchField
            placeholderText: "Search menus or items"
            width: parent.width * 0.8
        }

        Button {
            text: "Search"
            onClicked: {
                // Implement search functionality here
                console.log("Searching for: " + searchField.text)
            }
        }
    }

    // Main content area with menu list and details
    RowLayout {
        anchors.top: parent.children[0].bottom
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        anchors.right: parent.right

        // Menu list on the left
        Rectangle {
            width: parent.width * 0.3
            color: "lightgray"
            Layout.fillWidth: true
            Layout.fillHeight: true

            MenuList {
                id: menuList
                anchors.fill: parent
            }
        }

        // Menu item details in the center
        Rectangle {
            width: parent.width * 0.6
            color: "white"
            Layout.fillWidth: true
            Layout.fillHeight: true

            Column {
                anchors.centerIn: parent
                spacing: 10

                Text {
                    text: menuList.selectedItem ? menuList.selectedItem.name : "Select a menu item"
                    font.pointSize: 20
                    bold: true
                }

                MenuItem {
                    id: selectedMenuItem
                    visible: menuList.selectedItem !== null

                    // Bind to the selected menu item from MenuList
                    name: menuList.selectedItem ? menuList.selectedItem.name : ""
                    description: menuList.selectedItem ? menuList.selectedItem.description : ""

                    width: parent.width * 0.8
                }
            }
        }

        // Edit button on the right
        ColumnLayout {
            width: parent.width * 0.1
            Layout.fillHeight: true

            Button {
                text: "Edit"
                enabled: menuList.selectedItem !== null

                onClicked: {
                    // Open MenuEditor with selected item
                    menuEditor.item = menuList.selectedItem
                    menuEditor.visible = true
                }
            }
        }
    }

    // Menu editor overlay
    MenuEditor {
        id: menuEditor
        visible: false
        modal: true

        anchors.fill: parent
        color: "rgba(0, 0, 0, 0.5)"

        contentItem.opacity: 1

        onVisibleChanged: {
            if (visible) {
                // Focus the first editable field when editor is opened
                itemName.focus = true
            }
        }
    }
}