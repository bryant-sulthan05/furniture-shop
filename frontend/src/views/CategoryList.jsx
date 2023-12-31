import React, { useEffect } from 'react'
// component
import Layout from './Layout/Layout'
import CategoryAdmin from './Components/admin/CategoryAdmin'
// component.props
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Profile } from '../features/authSlice'

const CategoryList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state => state.auth));
    // const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(Profile());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/home");
        }
    }, [isError, navigate]);
    return (
        <Layout>
            {/* admin */}
            <CategoryAdmin />
            {/* user || !login */}
        </Layout>
    )
}

export default CategoryList