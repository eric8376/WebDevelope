package org.nxstudio.util.dao;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;

import java.util.ArrayList;
import java.util.List;

/**
 * 查询条件的实体
 */
public class ConditionQuery {


    private List<Criterion> criterions = new ArrayList<Criterion>();

    public void add(Criterion criterion) {
        criterions.add(criterion);
    }

    public void build(Criteria criteria) {
        for (Criterion criterion : criterions) {
            criteria.add(criterion);
        }
    }

}
