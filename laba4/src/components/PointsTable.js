import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPoints } from '../redux/reducers/pointsReducer';
import { submitPoint } from '../redux/reducers/pointsReducer';

const PointsTable = () => {
    const dispatch = useDispatch();
    const { points, loading, error } = useSelector((state) => state.points);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchPoints());
        }
    }, [dispatch, isAuthenticated, points.length]);

    if (!isAuthenticated) {
        return <p>You need to log in to view this page.</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <table className="order-table">
                <thead>
                <tr className="order-table-header">
                    <th>ID</th>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Hit</th>
                </tr>
                </thead>
                <tbody>
                {[...points].reverse().map((point, index) => (
                    <tr
                        key={point.id}
                        className={
                            index % 2 === 0
                                ? 'order-table-even-row'
                                : 'order-table-odd-row'
                        }
                    >
                        <td>{point.id}</td>
                        <td>{point.x}</td>
                        <td>{point.y}</td>
                        <td>{point.r}</td>
                        <td>{point.hit ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PointsTable;
