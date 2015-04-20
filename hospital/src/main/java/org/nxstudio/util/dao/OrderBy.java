package org.nxstudio.util.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;

import java.util.ArrayList;
import java.util.List;

/**
 * 排序的实体
 */
public class OrderBy {

    private List<Order> orders = new ArrayList<Order>();

    public void add(Order order) {
        orders.add(order);
    }

    public void build(Criteria criteria) {
        for (Order order : orders) {
            criteria.addOrder(order);
        }
    }
}
