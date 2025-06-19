const useGetUserPermissions = () => {
    return['ADMINISTRADOR']
}

const PermissionGate = ({ children, permissions }) => {
    const userPermissions = useGetUserPermissions()

    if (permissions.every(permission => userPermissions.includes(permission))) {
        return children
    }

    return null
}

export default PermissionGate;
